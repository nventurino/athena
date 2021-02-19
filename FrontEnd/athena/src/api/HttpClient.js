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
      // headers: {
      //   'Content-Type': file.type
      // }
    };
  client.put(`/test2.mp4?AWSAccessKeyId=AKIAQC35SLQK2I4UGOYF&Signature=DyRkF9s3rcQFR4ezPB8dnRPRDMk%3D&Expires=1613689085`, file, options)
}



export default client;
