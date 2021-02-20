import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import { uploadS3, getTranscript, getEmotionText, getEmotionFace } from '../api/HttpClient'
import '../App.css';
// var axios = require('axios');


export default function MyDropzone(props) {
  const onDrop = useCallback(async (acceptedFiles, props) =>{
    props.startProgress();
    // Do something with the files
    console.log('acceptedFiles', acceptedFiles)
    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader()
    //
    //   reader.onabort = () => console.log('file reading was aborted')
    //   reader.onerror = () => console.log('file reading has failed')
    //   reader.onload = () => {
    //   // Do whatever you want with the file contents
    //     const binaryStr = reader.result
    //     console.log(binaryStr)
    //   }
    //   reader.readAsArrayBuffer(file)
    //
    //
    // })

    var file = acceptedFiles[0]

        // var options = {
        //     headers: {
        //       'Content-Type': file.type
        //     }
        //   };
        //
        //   return axios.put('https://athena-upload-video.s3.amazonaws.com/test.mp4', file, options);

        const uploadFileInfo = await uploadS3(file, function(percentCompleted){
          console.log('percent cb', percentCompleted)
          props.updateProgress(percentCompleted);
        })



        if(uploadFileInfo){

          //Using a callback instead of await as we want to request it assynchronously
          getEmotionFace(uploadFileInfo.filename, uploadFileInfo.uniqueId)


          getTranscript(uploadFileInfo.filename, uploadFileInfo.uniqueId);
          // console.log('getback transcrupt ', transcript)


          setTimeout(function(){
            window.location.href = '/dashboard/' + uploadFileInfo.uniqueId;
          }, 2000)

          //
          // if(transcript?.data?.results){
          //   props.setTranscript(transcript.data.results.transcripts[0].transcript);
          //   const emotionText = await getEmotionText(uploadFileInfo.uniqueId);
          //   console.log('getback emotions ', emotionText)
          //   props.setEmotionTextData(emotionText);
          // }
          //
          // //Using a callback instead of await as we want to request it assynchronously
          // getEmotionFace(uploadFileInfo.filename, uploadFileInfo.uniqueId, function(emotionFace){
          //   console.log('getback emotionFace ', emotionFace)
          //   props.setEmotionFaceData(emotionFace.Faces);
          // });
          //
          //
          // const transcript = await getTranscript(uploadFileInfo.filename, uploadFileInfo.uniqueId);
          // console.log('getback transcrupt ', transcript)
          //
          // if(transcript?.data?.results){
          //   props.setTranscript(transcript.data.results.transcripts[0].transcript);
          //   const emotionText = await getEmotionText(uploadFileInfo.uniqueId);
          //   console.log('getback emotions ', emotionText)
          //   props.setEmotionTextData(emotionText);
          // }

        }


  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, props),
    multiple: false,
    accept: 'video/mp4, video/quicktime'

  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps(props.className)} />
      {
        isDragActive ?
          <p>Drop the file here ...</p> :
          <p className="uploadInput">Drag 'n' drop your video file here, or click to select the file</p>
      }
    </div>
  )
}
