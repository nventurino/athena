**Transcribe Audio**
----

* **URL**

 `/transcription`

* **Method:**
  
  `POST` 
  
* **URL Params**

`'s3location': ''`
  
 (This is bad design, probably should not be a URL param but making life easy for now.) 

* **Success Response:**
  
  
  * **Code:** 200 <br />
    **Content:** `{ 'transcriptionLocation` :  }`
 
` transcriptionLocation`: Will specify the s3 location for where transcribed file has landed.

* **Error Response:**

* **Sample Call:**
 `/transcription?s3Location="audio.mp3`


**Text EmotionRecognition**
----


* **URL**

 `/emotionText`

* **Method:**
  
  `POST` 
  
* **URL Params**

`'s3location': ''`
  
 (This is bad design, probably should not be a URL param but making life easy for now.) 

* **Success Response:**
  
  
  * **Code:** 200 <br />
    **Content:** `{ 'wordCount' : { : }  }`
 
` transcriptionLocation`: Will specify the s3 location for where transcribed file has landed.

* **Error Response:**

* **Sample Call:**

 `/emotionText?s3Location="transcribedText.txt"`

* **Sample Response:**

`{ 'wordCount' : { 'caring': 2, 'appreciative': 3 }  }`