import './feature.css';
import client from './participants';

const tmpHmtl = document.getElementById('msgTemplate').childNodes[1].innerHTML.toString();
const compiled = _.template(tmpHmtl);

client.on('chat-receive-message', (data) => {
  const newTmp = compiled({
    from: data.sender,
    to: data.reader,
    msg: data.message
  });
  document.getElementById('msgArea').innerHTML = newTmp + document.getElementById('msgArea').innerHTML;
});

const CHAT_PRIVILEGE_ALL = 1;
const CHAT_PRIVILEGE_NO_ONE = 4;
const CHAT_PRIVILEGE_EVERYONE_PUBLICLY = 5;

const privilegeMap = [{
    value: CHAT_PRIVILEGE_ALL,
    name: 'enable chat (include private chat)',
  },
  {
    value: CHAT_PRIVILEGE_EVERYONE_PUBLICLY,
    name: 'enable chat but disable private chat',
  },
  {
    value: CHAT_PRIVILEGE_NO_ONE,
    name: 'disable chat',
  },
];


document.getElementById('isChatEvery').addEventListener('change', function (e) {
  if (e.target.checked === true) {
    document.getElementById("change_user").disabled = true;
  } else {
    document.getElementById("change_user").disabled = false;
  }
});

client.on('chat-privilege-change', (data) => {
  const privilege = privilegeMap.find((v) => v.value === data.chatPrivilege);
  switch (privilege.value) {
    case CHAT_PRIVILEGE_NO_ONE: {
      document.getElementById("chatInput").disabled = true;
      document.getElementById("isChatEvery").disabled = true;
      document.getElementById("change_user").disabled = true;
      document.getElementById("sendMessage").disabled = true;
      break;
    }
    case CHAT_PRIVILEGE_ALL: {
      document.getElementById("chatInput").disabled = false;
      document.getElementById("isChatEvery").checked = false;
      document.getElementById("isChatEvery").disabled = false;
      document.getElementById("change_user").disabled = false;
      document.getElementById("sendMessage").disabled = false;
      break;
    }
    case CHAT_PRIVILEGE_EVERYONE_PUBLICLY: {
      document.getElementById("chatInput").disabled = false;
      document.getElementById("isChatEvery").checked = true;
      document.getElementById("isChatEvery").disabled = true;
      document.getElementById("change_user").disabled = true;
      document.getElementById("sendMessage").disabled = false;
      break;
    }
  }
});


const chatClient = client.getChatClient();

function sendMessage() {
  const tmpChatMsg = document.getElementById('chatInput').value;
  const userId = parseInt(document.getElementById('change_user').value);
  const isPublicChat = document.getElementById("isChatEvery").checked;
  if (isPublicChat) {
    chatClient.sendChatToAll(tmpChatMsg).then((message) => {
      document.getElementById("chatInput").value = "";
    }).catch((errorMessage) => {
      console.log(errorMessage);
      document.getElementById("sendError").textContent = errorMessage.reason;
      setTimeout(() => {
        document.getElementById("sendError").textContent = '';
      }, 3000);
    });
  } else {
    chatClient.sendChatToUser(tmpChatMsg, userId).then((message) => {
      document.getElementById("chatInput").value = "";
    }).catch((errorMessage) => {
      document.getElementById("sendError").textContent = errorMessage.reason;
      setTimeout(() => {
        document.getElementById("sendError").textContent = '';
      }, 3000);
      console.log(errorMessage);
    });
  }
}
document.getElementById("sendMessage").addEventListener('click', function (e) {
  sendMessage();
});

document.getElementById("chatInput").addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sendMessage").click();
  }
});

document.getElementById("clearnHistory").addEventListener('click', () => {
  document.getElementById('msgArea').innerHTML = '';
});