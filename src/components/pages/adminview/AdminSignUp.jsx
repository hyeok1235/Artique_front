import React from "react";
import { Layout, Input, Button, Form } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "../../../style/AdminLogin.css";
import AdminHeader from "./admin_section/AdminHeader";

const { Content } = Layout;

function AdminSignup() {
  const navigate = useNavigate();

  const signUp = async (values) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (data.message) {
        navigate("/adminview/login");
      } else {
        alert(`회원가입 실패 - ${data.error}`);
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Layout className="layout">
      <AdminHeader />
      <Content className="login-content">
        <Form className="login-form" layout="vertical" onFinish={signUp}>
          <Form.Item name="nickname">
            <Input placeholder="닉네임" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="아이디 (메일 주소)" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "비밀번호 확인을 입력해 주세요." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호 확인" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
            >
              계정 생성
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/adminview/login">
              <Button type="link" className="switch-button">
                로그인
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default AdminSignup;
