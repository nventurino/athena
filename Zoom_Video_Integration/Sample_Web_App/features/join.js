import ZoomInstant from '@zoomus/instantsdk';

const tmpArgs = testTool.parseQuery();
const instantArgs = {
    password: tmpArgs.password,
    username: function () {
        if (tmpArgs.username) {
            try {
                return testTool.b64DecodeUnicode(tmpArgs.username);
            } catch (e) {
                return tmpArgs.username;
            }
        }
        return
        testTool.detectOS() +
            testTool.getBrowserInfo()[0].split('.')[0].replace("/", "_");
    }(),
    token: tmpArgs.token || '',
    topic: function () {
        try {
            if (tmpArgs.topic) return testTool.b64DecodeUnicode(tmpArgs.topic);
            else {
                return;
            };
        } catch (e) {
            if (tmpArgs.topic) {
                return tmpArgs.topic;
            }
            return;
        }
    }(),
}
console.log(instantArgs);
const client = ZoomInstant.createClient();
client.init('en-US', location.origin + "/node_modules/@zoomus/instantsdk/dist/lib").then(function (res) {
    client.join(
        instantArgs.topic,
        instantArgs.token,
        instantArgs.username,
        instantArgs.password,
    ).then(() => {
        updateNavStatus();
        console.log('Join session success');
    }).catch((error) => {
        console.error(error);
        document.getElementById('app-loading').textContent = JSON.stringify(error);
    });
}).catch(function (error) {
    console.error(error);
});

function updateNavStatus() {
    const sessionInfo = client.getSessionInfo();
    const currentUser = client.getCurrentUserInfo();
    const tmpA = document.getElementById('instantStatus');
    document.getElementById('instantStatus').textContent = sessionInfo.isInMeeting ? "You are in session!" : "Left";
    document.getElementById('instantTopic').textContent = "Topic: " + sessionInfo.topic;
    document.getElementById('instantUsername').textContent = "Username: " + currentUser.displayName;
    if (sessionInfo.password)
        document.getElementById('instantPassword').textContent = "Password: " + sessionInfo.password;
    else document.getElementById('instantPassword').textContent = "";
    
}
client.on('connection-change', (payload) => {
    console.log(payload);
    if (payload.state === 'Connected') {
        document.getElementById("app-loading").style.display = "none";
    } else {
        console.log('join session fail');
    }
});

client.on('user-added', payload => {
    const sessionInfo = client.getSessionInfo();
    payload.forEach((item) => {
        console.log('participant %s joins the meeting', item.userId);
        if (item.userId === sessionInfo.userId) {
            updateNavStatus();
        }
    });
});

client.on('user-updated', (payload) => {
    const sessionInfo = client.getSessionInfo();
    payload.forEach((item) => {
        console.log('participant %s joins the meeting', item.userId);
        if (item.userId === sessionInfo.userId) {
            updateNavStatus();
        }
    });
});



document.getElementById("leaveJoinBtn").addEventListener("click", function () {
    client.leave().then(() => {
        console.log("levae session success");
        document.getElementById("app-loading").style.display = "";
        document.getElementById("app-loading").textContent = "levae session success";
        // window.location.href = "../index.html";

    }).catch(() => {
        console.log("leave session fail");
    });
});

window.client = client;
export default client;