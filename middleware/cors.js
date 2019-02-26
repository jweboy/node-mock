module.exports = function cors() {
    return function (req, res, next) {
        res.header('access-control-allow-origin', '*');
        res.header('access-control-allow-headers', '*');
        next();
    }
}