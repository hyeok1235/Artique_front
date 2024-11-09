import React, { useState } from "react";
import { Layout, Input, Button, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../../../style/AdminLogin.css";
import AdminHeader from "./admin_section/AdminHeader";

const { Content } = Layout;

function AdminLogin() {
  const navigate = useNavigate();
  const [action, setAction] = useState("login");

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
      console.log(response.headers);
      const access_token = response.headers.get("Access-Token"); //null 되는 문제
      const data = await response.json();
      console.log(data);
      if (data.message) {
        localStorage.setItem("accessToken", access_token);
        console.log(localStorage.getItem("accessToken"));
        navigate("/adminview/list");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

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
      console.log(data);
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

  const handleSubmit = (values) => {
    console.log(values);
    if (action === "login") {
      logIn(values);
    } else {
      signUp(values);
    }
  };

  return (
    <Layout className="layout">
      <AdminHeader />
      <Content className="login-content">
        <Form className="login-form" layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="nickname">
            <Input placeholder="닉네임" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="아이디 (메일 주소)" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              onClick={() => setAction("login")}
            >
              로그인
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="register-button"
              onClick={() => setAction("signup")}
            >
              계정 생성
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default AdminLogin;
