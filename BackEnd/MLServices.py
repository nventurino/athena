from shutil import rmtree
import json
from flask import Flask, request, Response, render_template, jsonify, make_response
from flask_cors import CORS
import boto3
import json
import time
from helpers import emotions, word_map, detect_emotion_and_magnitude
transcribe = boto3.client(service_name='transcribe',region_name='us-east-1')
s3 = boto3.resource('s3') 
from collections import Counter

app = Flask(__name__)
CORS(app)

bucket = 'gbw-team24-test'

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
        global bucket
        content_object = s3.Object(bucket, transcriptJSON)
        file_content = content_object.get()['Body'].read().decode('utf-8')
        json_content = json.loads(file_content)
        transcriptString = json_content['results']['transcripts'][0]['transcript']  #maynot exist
        responseDict = {}
        transcriptStringList = transcriptString.split(' ')
        transcriptStringListLC = [ word.lower() for word in transcriptStringList]
        transcriptStringWordCount = Counter(transcriptStringListLC)
        print(transcriptStringWordCount)
        response_matrix = detect_emotion_and_magnitude(transcriptStringListLC, word_map, emotions)
        responseDict = {'response_matrix': response_matrix}
        resp = jsonify(responseDict)
        resp.status_code = 200
        return resp
    except Exception as e:
        app.log_exception(e)
        error_body = json.dumps({"parse": "transcript doesn't exist for this filename"})
        return Response(error_body, 400, content_type="application/problem+json")
if __name__ == '__main__': 
    init_params()
    app.run(host='0.0.0.0',port=9200, debug=True)