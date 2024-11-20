import React from "react";
import { Layout, Input, Button, Form } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "../../../style/AdminLogin.css";
import AdminHeader from "./admin_section/AdminHeader";

const { Content } = Layout;

function AdminLogin() {
  const navigate = useNavigate();

  const logIn = async (values) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const access_token = response.headers.get("Access-Token");
      const data = await response.json();
      if (data.message === "Login successful") {
        localStorage.setItem("access_token", access_token);
        navigate("/adminview/list");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Layout className="layout">
      <AdminHeader />
      <Content className="login-content">
        <Form className="login-form" layout="vertical" onFinish={logIn}>
          <Form.Item name="email">
            <Input placeholder="아이디 (메일 주소)" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              로그인
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/adminview/signup">
              <Button type="link" className="switch-button">
                계정 생성
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default AdminLogin;
