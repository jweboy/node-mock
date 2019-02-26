const rules = [];
let index = 0;

module.exports = {
    post: function postEndpoint(req, res) {
        index++;
        rules.push({
            id: index,
            ...req.body,
        });
        res.send(rules);
    },
    get: function getEndpont(_, res) {
        res.send(rules);
    }
};