import React from 'react';
import { Layout, Input, Button, Form, Typography } from 'antd';
import '../../../style/AdminLogin.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function AdminLogin() {
  return (
    <Layout className="layout">
      <Header className="login-header">
        <div className="login-logo">Artique</div>
      </Header>
      <Content className="login-content">
        <Form className="login-form" layout="vertical">
          <Form.Item>
            <Input placeholder="닉네임" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="아이디 (메일 주소)" />
          </Form.Item>
          <Form.Item>
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              로그인
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" className="register-button">
              계정 생성
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default AdminLogin;
