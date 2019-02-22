import React, { Component } from 'react';
import { Button, Row, Col, Modal, Form, Input, Select } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;

class Project extends Component {
	constructor() {
		super();

		this.state = {
			visible: true,
			ruleForm: {
				url: '/test',
				method: 'GET',
				desc: '测试URL',
			},
		};
	}
    handleClick = () => {
    	this.setState({
    		visible: true,
    	});
    }
    handleSubmit = () => {
    	this.props.form.validateFields((err, fieldsValue) => {
    		if(err != null) {
    			return false;
    		}
    		this.setState({
    			visible: false,
    		});
    		console.log(fieldsValue);
    		fetch('http://localhost:3000/endpoint', {
    			body: JSON.stringify(fieldsValue),
    			method: 'POST',
    		})
    			.then(res=> res.json())
    			.then(data => {
    				console.log(data);
    			});
    	});
    }
    handleCloseModal = () => {
    	this.setState({
    		visible: false,
    	});
    }
    render() {
    	const { form } = this.props;
    	const { getFieldDecorator } = form;
    	const { ruleForm, visible } = this.state;

    	const formItemLayout = {
    		labelCol: { span: 6 },
    		wrapperCol: { span: 18 },
    	};

    	return (
    		<div>
    			<Row>
    				<Col span={12} offset={6}>
    					<footer className={styles.footer}>
    						<Button type="primary" onClick={this.handleClick}>新增规则</Button>
    						{/* Modal */}
    						<Modal visible={visible} title="新增规则" onOk={this.handleSubmit} onCancel={this.handleCloseModal} maskClosable={false}>
    							<Form>
    								<FormItem
    									label="URL"
    									{...formItemLayout}
    								>
    									{
    										getFieldDecorator('url', {
    											initialValue: ruleForm.url,
    											rules: [{
    												type: 'string',
    												required: true,
    												message: '请输入URL'
    											}],
    										})(
    											<Input placeholder="请输入URL" />
    										)
    									}
    								</FormItem>
    								<FormItem
    									label="Method"
    									{...formItemLayout}
    								>
    									{
    										getFieldDecorator('method', {
    											initialValue: ruleForm.method,
    										})(
    											<Select style={{ width: 120 }}>
    												<Option value="GET">GET</Option>
    												<Option value="POST">POST</Option>
    												<Option value="PUT">PUT</Option>
    												<Option value="DELETE">DELETE</Option>
    												<Option value="PATCH">PATCH</Option>
    											</Select>
    										)
    									}
    								</FormItem>
    								<FormItem
    									label="Description"
    									{...formItemLayout}
    								>
    									{
    										getFieldDecorator('description', {
    											initialValue: ruleForm.desc,
    											rules: [{
    												type: 'string',
    												required: true,
    												message: '请输入描述'
    											}],
    										})(
    											<Input placeholder="请输入描述" />
    										)
    									}
    								</FormItem>
    							</Form>
    						</Modal>
    					</footer>
    				</Col>
    			</Row>
    		</div>
    	);
    }
}

export default Form.create()(Project);
