// jwt generate token
function generateInstantToken(sdkKey, sdkSecret, topic, password = '') {
  let tmpToken = '';
  const iat = Math.round(new Date().getTime() / 1000);
  const exp = iat + 60 * 60 * 2;
  // Header
  const oHeader = { alg: 'HS256', typ: 'JWT' };
  // Payload
  const oPayload = {
      app_key: sdkKey,
      iat,
      exp,
      tpc: topic,
      pwd: password,
  };
  // Sign JWT
  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  tmpToken = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
  return tmpToken;
}

function getInstantArgs() {
  const sdkKey = document.getElementById('sdkKey').value;
  const sdkSecret = document.getElementById('sdkSecret').value
  const instantArgs = {
      password: document.getElementById('inputPassword').value,
      username: document.getElementById('inputUsername').value,
      token: '',
      topic: document.getElementById('inputTopic').value,
  };

  if (!instantArgs.username || !instantArgs.topic) {
      document.getElementById("joinWarnText").style.display = "inline";
      setTimeout(function(){
          document.getElementById("joinWarnText").style.display = "none";
      }, 7000);
      return false;
  }
  else {
      document.getElementById("joinWarnText").style.display = "none";
  }
  instantArgs.token = generateInstantToken(sdkKey, sdkSecret, instantArgs.topic, instantArgs.password);

  return instantArgs;
}

function initSDKCheck(eleId) {
  if (eleId === 'sdkKey' || eleId === 'sdkSecret') {
      
      if (document.getElementById(eleId).value) {
          document.getElementById(eleId).classList.remove("border-danger-warn");
      } else {
          document.getElementById(eleId).classList.add("border-danger-warn");
      }
      document.getElementById(eleId).addEventListener("change", function(e){
          if (e.target.value) {
              document.getElementById(eleId).classList.remove("border-danger-warn");
              
          } else {
              document.getElementById(eleId).classList.add("border-danger-warn");
          }
          const isStoreKey = document.getElementById('storeKey').checked;
          if (isStoreKey && e.target.value) testTool.setCookie(eleId, e.target.value);
      });
  } else {
      if (document.getElementById(eleId).value) {
          document.getElementById(eleId).parentElement.parentElement.parentElement.classList.remove("border-danger-warn");
      } else {
          document.getElementById(eleId).parentElement.parentElement.parentElement.classList.add("border-danger-warn");
      }
      document.getElementById(eleId).addEventListener("change", function(e){
          if (e.target.value) {
              document.getElementById(eleId).parentElement.parentElement.parentElement.classList.remove("border-danger-warn");
          } else {
              document.getElementById(eleId).parentElement.parentElement.parentElement.classList.add("border-danger-warn");
          }
      });
  }
  
}

initSDKCheck("sdkKey");
initSDKCheck("sdkSecret");
initSDKCheck("inputUsername");
initSDKCheck("inputTopic");
// initSDKCheck("inputPassword");

// clear/store sdk when click checkbox
function initStoreSDK() {
  const isStoreKey = testTool.getCookie('storeKey');
  
  if (isStoreKey) {
      document.getElementById('storeKey').setAttribute("checked", "checked");
  } else {
      document.getElementById('storeKey').removeAttribute("checked");
  }

  document.getElementById('storeKey').addEventListener("change", function(e){        
      if (e.target.checked === true) {
          testTool.setCookie('storeKey', 1);
          testTool.setCookie('sdkKey', document.getElementById('sdkKey').value);
          testTool.setCookie('sdkSecret', document.getElementById('sdkSecret').value);
      } else {
          testTool.setCookie('storeKey', '');
          testTool.setCookie('sdkKey', '');
          testTool.setCookie('sdkSecret', '');
      }
  });
}

initStoreSDK();

// auto fill sdk key/secret use cookie
function initSDKKey() {
  const tmpSdkKey = testTool.getCookie('sdkKey');
  const tmpSdkSecret = testTool.getCookie('sdkSecret');
  const isStoreKey = document.getElementById('storeKey').checked;
  if (isStoreKey) {

      document.getElementById('sdkKey').value = tmpSdkKey;
      document.getElementById('sdkSecret').value = tmpSdkSecret;
      if (tmpSdkKey) {
          document.getElementById("sdkKey").classList.remove("border-danger-warn");
      }
      if (tmpSdkSecret) {
          document.getElementById("sdkSecret").classList.remove("border-danger-warn");
      }
  }
  
}

initSDKKey();


function initClickJoin(eleId) {
  document.getElementById(eleId).addEventListener('click', function(e){
      const clickId = e.currentTarget.id;
      let redirectUrl = '';
      switch(clickId) {
          case 'joinMinUi': {
              redirectUrl = './all/index.html';
              break;
          }
          case 'joinVideo': {
              redirectUrl = './features/video.html';
              break;
          }
          case 'joinAudio': {
              redirectUrl = './features/audio.html';
              break;
          }
          case 'joinSharing': {
              redirectUrl = './features/share.html';
              break;
          }
          case 'joinChat': {
              redirectUrl = './features/chat.html';
              break;
          }
      }

      const instantArgs = getInstantArgs();
      const newArgs = {
          topic: testTool.b64EncodeUnicode(instantArgs.topic),
          username: testTool.b64EncodeUnicode(instantArgs.username),
          password: instantArgs.password,
          token: instantArgs.token,
      }
      if (!instantArgs) {
          return;
      }
      const win = window.open(redirectUrl + '?' + testTool.serialize(newArgs), '_blank');
      if (win) {
          win.focus();
      }
      console.log(clickId);
  });
}

initClickJoin("joinVideo");
initClickJoin("joinAudio");
initClickJoin("joinSharing");
initClickJoin("joinChat");
