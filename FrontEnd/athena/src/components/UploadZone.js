import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import { uploadS3 } from '../api/HttpClient'
import '../App.css';
// var axios = require('axios');


export default function MyDropzone(props) {
  const onDrop = useCallback((acceptedFiles, props) =>{
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

        return  uploadS3(file, function(percentCompleted){
          console.log('percent cb', percentCompleted)
          props.updateProgress(percentCompleted);
        })


  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, props)

  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps(props.className)} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p className="uploadInput">Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}
