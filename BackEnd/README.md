**Transcribe Audio**
----

* **URL**

 `/transcription`

* **Method:**
  
  `POST` 
  
* **URL Params**

`'s3location': ''` This is the location of the audiofile.

`'sessionName':''`  This will also decide the output bucket. This needs to be new everytime.


 (This is bad design, these params should not be URL params but making life easy for build weekend) 

 Note the bucket will always be `gbw-team24-test` for the hackathon.

* **Success Response:**
  
  
  * **Code:** 200 <br />
    **Content:** `{ 'transcriptionLocation` :  }`
 
` transcriptLocation`: Will specify the s3 location for where transcribed file has landed.

* **Error Response:**

* **Sample Call:**
 `/transcription?s3Location='barackobamasenatespeech.mp3'&sessionName='gbw-172021'`


**Text EmotionRecognition**
----


* **URL**

 `/emotionText`

* **Method:**
  
  `POST` 
  
* **URL Params**

`'transcriptLocation': ''`
  
 (This is bad design, these params should not be URL params but making life easy for build weekend) 

* **Success Response:**
  
  
  * **Code:** 200 <br />
    **Content:** `{ 'wordCount' : { : }  }`
 
` transcriptLocation`: Will specify the s3 location for where transcribed file has landed.

* **Error Response:**

* **Sample Call:**

 `/emotionText?s3Location="transcribedText.json"`

* **Sample Response:**

`{ 'wordCount' : { 'caring': 2, 'appreciative': 3 }  }`