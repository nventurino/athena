import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const API_URLS = {
  s3_upload_url: 'https://athena-video-upload.s3.amazonaws.com',
  get_pressigned_url: 'http://localhost:9200'
}

let refreshToken = null;



var client = axios.create({
  baseURL: API_URLS.s3_upload_url,
  // timeout: 20000,
  // headers: { 'content-type': 'application/json' },
});

var clientLocal = axios.create({
  baseURL: API_URLS.get_pressigned_url,
});

// var options = {
//   headers: {
//     // 'Content-Type': file.type
//     'Content-Type': 'video/mp4'
//   }
// };

function getFileExtension(filename){
  return /[^.]+$/.exec(filename);
}

export async function uploadS3(file){
  const filename =  uuidv4() + '.'  + getFileExtension(file.path);
  console.log('filename: ', filename)

  var bodyFormData = new FormData();
  bodyFormData.append('contentType', file.type);
  bodyFormData.append('filename', filename);

  var presignedUrlRequest = await clientLocal.post('/upload_url',bodyFormData)
  const presignedUrl = presignedUrlRequest.data;
  console.log('presignedUrl', presignedUrl)




  var options = {
      headers: {
        'Content-Type': file.type
      }
    };

  const config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    }
  }
  // client.put(`/test2.mp4?AWSAccessKeyId=AKIAQC35SLQK2I4UGOYF&Signature=DyRkF9s3rcQFR4ezPB8dnRPRDMk%3D&Expires=1613689085`, file, options)

  axios.put(presignedUrl, file, options)

}



export default client;
