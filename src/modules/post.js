const request = require('request');

const url = postApiUrl;

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            request(url + "/posts", { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        });
    },
    get: (postId) => {
        return new Promise((resolve, reject) => {
            request(url + "/posts/" + postId, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        });
    },
    comments: (postId) => {
        return new Promise((resolve, reject) => {
            request(url + "/posts/" + postId + "/comments", { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        });
    }
}