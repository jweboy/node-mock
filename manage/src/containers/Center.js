import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

class Center extends Component {
	render() {
		return (
			<div>
				<Row>
					<Col span={12} offset={6}>
						<footer className={StyleSheet.footer}>
							<Button type="primary">新增规则</Button>
						</footer>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Center;
