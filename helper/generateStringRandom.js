function randomString(length) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    let randomString = "";

    for (i = 0; i < length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomString += rnum;
    }

    return randomString;
}

module.exports = randomString;
