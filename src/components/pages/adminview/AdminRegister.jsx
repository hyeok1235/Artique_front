import React from 'react';
import { Layout, Input, Typography, Button, Row, Col, Form } from 'antd';
import '../../../style/AdminRegister.css';
import AdminHeader from './admin_section/AdminHeader';

const { Content } = Layout;
const { Title } = Typography;

function AdminRegister() {
  return (
    <Layout className="layout">
        <AdminHeader>
          <a href="#" className="logout-link">로그아웃</a>
        </AdminHeader>
      {/* <Header className="app-header">
        <div className="app-logo">Artique</div>
        <div className="app-user-info">
          김예락님 안녕하세요! | <a href="#" className="logout-link">로그아웃</a>
        </div>
      </Header> */}
      <Content className="app-content">
        <Row gutter={32}>
          {/* 좌측 섹션 */}
          <Col span={12}>
            <Button type="link" className="back-button">뒤로 가기</Button>
            <div className="art-preview"></div>
            <Form layout="vertical" className="art-form">
              <Form.Item label="작품 이름">
                <Input placeholder="작품 이름을 입력하세요" />
              </Form.Item>
              <Form.Item label="작가명">
                <Input placeholder="저자 이름을 입력하세요" />
              </Form.Item>
              <Form.Item label="갤러리">
                <Input placeholder="전시 장소를 입력하세요" />
              </Form.Item>
              <Form.Item label="전시 기간">
                <Input placeholder="2023.04.05의 형태로 입력하세요" />
              </Form.Item>
            </Form>
          </Col>
          
          {/* 우측 섹션 */}
          <Col span={12}>
            <Title level={5}>Custom your AI</Title>
            <Form layout="vertical">
              <Form.Item label="관객에게 꼭 설명하고 싶은 정보는? - explanation">
                <Input.TextArea rows={4} placeholder="ex. 이 작품을 제작하게 된 배경" />
              </Form.Item>
              <Form.Item label="관객에게 이 질문은 꼭 물어보고 싶다! - question">
                <Input.TextArea rows={4} placeholder="ex. 제 작품을 당신의 삶과 연결지을 수 있나요?" />
              </Form.Item>
            </Form>
            <Button type="primary" className="submit-button">등록</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default AdminRegister;
