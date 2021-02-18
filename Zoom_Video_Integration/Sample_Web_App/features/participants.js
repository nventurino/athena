import client from './join';

const userOptionCompiled = _.template('<option class="" value="${ id }">${ username }</option>');

const getDisplayNameLabel = (currentUserId, user) => {
    const dnSuffixGeneratorFunc = [
        [
            (currentUserId, user) => user.isHost,
            'Host',
        ],
        [
            (currentUserId, user) => user.isManager,
            'Manager',
        ],
        [
            (currentUserId, user) => currentUserId === user.userId,
            'Me',
        ],
    ];
    const tempSuffix = dnSuffixGeneratorFunc.reduce(
        (suffix, [testFunc, showStr]) => suffix
        // eslint-disable-next-line no-nested-ternary
        +
        (testFunc(currentUserId, user) ?
            suffix ?
            `, ${showStr}` :
            showStr :
            ''),
        '',
    );
    return tempSuffix ? `(${tempSuffix})` : '';
}

function updateUserList(allUser) {
    try {
        document.getElementById("change_user").innerHTML = '';
        const userArray = []
        const currentUser = client.getCurrentUserInfo();
        allUser.forEach(function (user) {
            const tmpUsername = user.displayName + getDisplayNameLabel(currentUser.userId, user);
            const userHtml = userOptionCompiled({
                id: user.userId,
                username: tmpUsername
            });
            userArray.push(userHtml);
        });
        document.getElementById("change_user").innerHTML = userArray.join("");
    } catch {
        console.log("con't get id change_user");
    }

}
client.on('user-added', () => {
    updateUserList(client.getAllUser());
});
client.on('user-removed', () => {
    updateUserList(client.getAllUser());
});
client.on('user-updated', () => {
    updateUserList(client.getAllUser());
});


export default client;