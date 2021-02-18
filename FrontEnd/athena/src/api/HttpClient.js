import axios from 'axios';

const API_URLS = {
  s3_upload_url: 'https://athena-video-upload.s3.amazonaws.com',

}

let refreshToken = null;



var client = axios.create({
  baseURL: API_URLS.s3_upload_url,
  // timeout: 20000,
  // headers: { 'content-type': 'application/json' },
});

// var options = {
//   headers: {
//     // 'Content-Type': file.type
//     'Content-Type': 'video/mp4'
//   }
// };

export function uploadS3(file){
  var options = {
      headers: {
        'Content-Type': file.type
      }
    };
  client.put(`/test.mp4`, file, options)
}



export default client;
