import React, { Component } from 'react';
import { Button, Row, Col, Modal, Form, Input, Select, Collapse  } from 'antd';
import axios from 'axios';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
const REQUESTURL = 'http://localhost:3000/endpoint';

class Project extends Component {
	constructor() {
		super();

		this.state = {
			visible: false,
			ruleForm: {
				url: '/test',
				method: 'GET',
				desc: '测试URL',
			},
			list: [],
		};
	}
	componentDidMount() {
		axios.get(REQUESTURL).then(({ data }) => {
			console.warn(this.groupBy(data));
			this.setState({
				list: this.groupBy(data),
			});
		});
	}
	groupBy(arr = []) {
		const combine = arr.reduce((obj, val, index) => {
			obj[val.url] = (obj[val.url] || []).concat(arr[index]);
			return obj;
		}, {});

		return Object.keys(combine).map(key => {
			return {
				key,
				data: combine[key]
			};
		});
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
    		axios({
    			url: REQUESTURL,
    			data: fieldsValue,
    			method: 'POST',
    		})
    			.then(({ data }) => {
    				this.setState({
    					list: this.groupBy(data),
    					visible: false,
    				});
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
    	const { ruleForm, visible, list } = this.state;

    	const formItemLayout = {
    		labelCol: { span: 6 },
    		wrapperCol: { span: 18 },
    	};

    	return (
    		<div className="project">
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
    			<Collapse>
    				{
    					list.map((item) => (
    						<Panel key={item.key} header={item.key}>
    							{
    								item.data.map(child => {
    									<p key={child.id}>{child.url}</p>;
    								})
    							}
    						</Panel>
    					))
    				}
    			</Collapse>
    		</div>
    	);
    }
}

export default Form.create()(Project);
