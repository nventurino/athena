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

    var file = acceptedFiles[0];
    console.log('file', file)

    const extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    console.log('extension', extension)


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

          var type = "video";
          if(file.type.indexOf('audio') > -1){
            type = "audio";
          }



          if(type == "video"){
            //Using a callback instead of await as we want to request it assynchronously
            getEmotionFace(uploadFileInfo.filename, uploadFileInfo.uniqueId)
          }
          getTranscript(uploadFileInfo.filename, uploadFileInfo.uniqueId);
          // console.log('getback transcrupt ', transcript)


          setTimeout(function(){

            window.location.href = '/dashboard/' + type + '/' + extension + '/' +  uploadFileInfo.uniqueId;
          }, 2000)


        }


  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, props),
    multiple: false,
    accept: 'video/*, audio/*, '

  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps(props.className)} />
      {
        isDragActive ?
          <p>Drop the file here ...</p> :
          <div className="uploadInput">
            <img className="upload-icon" src="/upload-white.png" />
            <br></br>
            <br></br>
            <p>Drag & drop your video file here<br></br>
            or <u>click to browse</u></p>
          </div>
      }
    </div>
  )
}
