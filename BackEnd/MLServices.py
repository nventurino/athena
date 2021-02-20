from shutil import rmtree
import json
from flask import Flask, request, Response, render_template, jsonify, make_response
from flask_cors import CORS
import boto3
import json
import time
from helpers import get_bucketed_utterances, score_emotion_utterances
from flag_sentences import detect_nuggets
from botocore.config import Config
from summarization import create_paragraph_summary

transcribe = boto3.client(service_name='transcribe',region_name='us-east-1')
s3 = boto3.resource('s3')
# s3 = boto3.client('s3', region_name='us-east-1', config=Config(signature_version='v4'))
s3UploadBucket = 'gbw-team24-test'
from collections import Counter

app = Flask(__name__)
CORS(app)

bucket = 'gbw-team24-test'



# Alexis TEST for facial emotion detection

rekognition = boto3.client('rekognition')

@app.route('/emotionFace', methods=["POST"])
# ============== Faces===============
def StartFaceDetection():
    try:
        content = request.args
        filename = content['filename']
        uniqueId = content['uniqueId']
        response = rekognition.start_face_detection(Video={'S3Object': {'Bucket': s3UploadBucket, 'Name': filename}}, FaceAttributes='ALL')
            # NotificationChannel={'RoleArn': self.roleArn, 'SNSTopicArn': self.snsTopicArn})

        startJobId=response['JobId']
        print('Start Job Id: ' + startJobId)

        while True:
            status = rekognition.get_face_detection(JobId=startJobId,
                                            # MaxResults=10,
                                            # NextToken=''
                                            )
            print("status", status)
            if status['JobStatus'] in ['SUCCEEDED', 'FAILED']:
                s3object = s3.Object(s3UploadBucket, 'face-' + uniqueId + '.json')
                s3object.put(
                    Body=(bytes(json.dumps(status['Faces']).encode('UTF-8')))
                )

                break
            print("Not ready yet...")
            time.sleep(5)
        return(status)

    except Exception as e:
        app.log_exception(e)
        error_body = json.dumps({"parse": "badly formed query or missing params or resource doesn't exist"})
        return Response(error_body, 400, content_type="application/problem+json")


#-------





@app.route('/upload_url', methods=["POST"])
def create_presigned_url():
    try:
        # Generate a presigned URL for the S3 object
        content = request.form
        print(content)
        contentType = content['contentType']
        print(contentType)
        filename = content['filename']
        print(filename)
        s3_client = boto3.client('s3')
        response = s3_client.generate_presigned_url('put_object',
                                                    Params={'Bucket': s3UploadBucket,
                                                            'Key': filename,
                                                            'ContentType': contentType,
                                                            # 'ACL': 'public-read'
                                                            },


                                                    # ExpiresIn=3600,

                                                    )
        return response
    except Exception as e:
        app.log_exception(e)
        error_body = json.dumps({"parse": "badly formed query or missing params or resource doesn't exist"})
        return Response(error_body, 400, content_type="application/problem+json")

    # The response contains the presigned URL



# def create_presigned_post(fields=None, conditions=None, expiration=3600):
#     s3_client = boto3.client('s3')
#     response = s3_client.list_buckets()
#     return response


@app.route('/transcription', methods=["POST"])
def create_transcription():
    try:
        content = request.args
        job_name = content['session']
        print(job_name)
        audio_file = content['s3location']
        print(audio_file)
        global bucket
        job_uri = "https://" + bucket + ".s3.us-east-1.amazonaws.com/"+ audio_file
        print(job_uri)
        transcribe.start_transcription_job(
                TranscriptionJobName = job_name,
                Media = {'MediaFileUri': job_uri},
                LanguageCode = 'en-US',
                OutputBucketName = bucket
            )
        while True:
            status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
            if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
                break
            print("Not ready yet...")
            time.sleep(5)
        return(status)
    except Exception as e:
        app.log_exception(e)
        error_body = json.dumps({"parse": "badly formed query or missing params or resource doesn't exist"})
        return Response(error_body, 400, content_type="application/problem+json")

@app.route('/emotionText', methods=["POST"])
def emotion_recognition():
    try:
        content = request.args
        transcriptJSON = content['transcriptLocation']
        print(transcriptJSON)
        content_object = s3.Object(bucket, transcriptJSON)
        file_content = content_object.get()['Body'].read().decode('utf-8')
        json_content = json.loads(file_content)
        transcriptString = json_content['results']['transcripts'][0]['transcript']  #maynot exist
        summary = create_paragraph_summary(transcriptString)
        utterances = get_bucketed_utterances(json_content['results']['items'])
        nuggets = detect_nuggets(json_content['results']['items'])
        emotion_scored_utterances = score_emotion_utterances(utterances)
        analyses = {
            "transcript": transcriptString,
            "summary": summary,
            "emotion_map": emotion_scored_utterances,
            'nuggets': nuggets
        }
        responseDict = {'response_dict': analyses}
        resp = jsonify(responseDict)
        resp.status_code = 200
        return resp
    except Exception as e:
        app.log_exception(e)
        error_body = json.dumps({"parse": "transcript doesn't exist for this filename"})
        return Response(error_body, 400, content_type="application/problem+json")


@app.route('/emotionTranscription', methods=["POST"])
def create_emotion_transcription():
    try:
        content = request.args
        job_name = content['session']
        print(job_name)
        audio_file = content['s3location']
        print(audio_file)
        global bucket
        job_uri = "https://" + bucket + ".s3.us-east-1.amazonaws.com/"+ audio_file
        print(job_uri)
        transcribe.start_transcription_job(
                TranscriptionJobName = job_name,
                Media = {'MediaFileUri': job_uri},
                LanguageCode = 'en-US',
                OutputBucketName = bucket
            )
        while True:
            status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
            if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
                break
            print("Not ready yet...")
            time.sleep(5)
        return emotion_recognition_text(job_name)

    except Exception as e:
        app.log_exception(e)
        error_body = json.dumps({"parse": "badly formed query or missing params or resource doesn't exist"})
        return Response(error_body, 400, content_type="application/problem+json")

def emotion_recognition_text(job_name):
    try:
        content_object = s3.Object(bucket, job_name + ".json")
        print(job_name)
        file_content = content_object.get()['Body'].read().decode('utf-8')
        json_content = json.loads(file_content)
        transcriptString = json_content['results']['transcripts'][0]['transcript']  #maynot exist
        summary = create_paragraph_summary(transcriptString)
        utterances = get_bucketed_utterances(json_content['results']['items'])
        nuggets = detect_nuggets(json_content['results']['items'])
        emotion_scored_utterances = score_emotion_utterances(utterances)
        analyses = {
            "transcript": transcriptString,
            "summary": summary,
            "emotion_map": emotion_scored_utterances,
            'nuggets': nuggets
        }
        responseDict = {'response_dict': analyses}
        resp = jsonify(responseDict)
        s3object = s3.Object(s3UploadBucket, 'emotionTranscription-' + job_name + '.json')
        s3object.put(
                    Body=(bytes(json.dumps(analyses).encode('UTF-8')))
        )
        resp.status_code = 200
        return resp
    except Exception as e:
        app.log_exception(e)
        error_body = json.dumps({"parse": "transcript doesn't exist for this filename"})
        return Response(error_body, 400, content_type="application/problem+json")


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9200, debug=True)
