/* eslint-disable */
module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
	],
	plugins: [
        require('react-hot-loader/babel'),
        ["@babel/plugin-proposal-class-properties", {"loose": true }],
        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css" // `style: true` 会加载 less 文件
        }]
	],
};
