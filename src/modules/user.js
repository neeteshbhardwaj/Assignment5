const dataStore = dummyUsers;
module.exports = {
    create: (user) => {
        var encryptedPassword = user.password;
        return new Promise((resolve, reject) => {
            dataStore.push(user);
            resolve(user);
        });
    },
    get: (email) => {

    },
    find: (email, password) => {
        var encryptedPassword = password;
        return new Promise((resolve, reject) => {
            var user;
            for (var i = 0; i < dataStore.length; i++) {
                var u = dataStore[i];
                if (u.email === email && u.password === encryptedPassword) {
                    user = u;
                    break;
                }
            }
            resolve(user);
        });
    }
}