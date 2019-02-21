import React, { Component } from 'react';
import { Button, Row, Col, Modal, Form, Input, Select } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;

class Project extends Component {
	constructor() {
		super();

		this.state = {
			visible: false,
			ruleForm: {
				url: '',
				method: 'GET',
				desc: '',
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

    	return (
    		<div>
    			<Row>
    				<Col span={12} offset={6}>
    					<footer className={styles.footer}>
    						<Button type="primary" onClick={this.handleClick}>新增规则</Button>
    						{/* Modal */}
    						<Modal visible={visible} title="新增规则" onOk={this.handleSubmit} onCancel={this.handleCloseModal}>
    							<Form layout="inline">
    								<FormItem label="URL">
    									{
    										getFieldDecorator('url', {
    											initialValue: ruleForm.url,
    										})(
    											<Input />
    										)
    									}
    								</FormItem>
    								<FormItem label="Method">
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
    								<FormItem label="Description">
    									{
    										getFieldDecorator('description', {
    											initialValue: ruleForm.desc
    										})(
    											<Input />
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
