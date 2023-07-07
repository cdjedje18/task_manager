const generateId = () => {
    var length = 11;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const getPageCount = (total, pageSize) => {

    let quotient = Math.floor(total / pageSize)
    let res = total % pageSize

    return res > 0 ? quotient + 1 : quotient
}

module.exports = {
    generateId,
    getPageCount
}