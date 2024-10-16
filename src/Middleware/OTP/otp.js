const getOtp = async (length = 4) => {
    // return '1234';
    return Math.floor(1000 + Math.random() * 9000);
};

module.exports = getOtp;