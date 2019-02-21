const express = require('express');
const Mock = require('mockjs');
const restc = require('restc');

const app = express();

app.use(restc.express());

app.get('/test', function (req, res) {
    const data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })
    res.send(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});