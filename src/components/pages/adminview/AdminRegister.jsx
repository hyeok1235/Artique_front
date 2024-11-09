import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Input, Typography, Button, Row, Col, Form } from 'antd';
import '../../../style/AdminRegister.css';
import AdminHeader from './admin_section/AdminHeader';

const { Content } = Layout;
const { Title } = Typography;

function AdminRegister() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    const formData = new FormData();

    const picturePhoto = document.querySelector('input[name="picture_photo"]').files[0];
    const name = document.querySelector('input[name="name"]').value;
    const artist = document.querySelector('input[name="artist"]').value;
    const gallery = document.querySelector('input[name="gallery"]').value;
    const endDate = new Date(document.querySelector('input[name="end_name"]').value);
    const customExplanation = document.querySelector('textarea[placeholder="ex. 이 작품을 제작하게 된 배경"]').value;
    const customQuestion = document.querySelector('textarea[placeholder="ex. 제 작품을 당신의 삶과 연결지을 수 있나요?"]').value;

    console.log(picturePhoto, name, artist, gallery, endDate, customExplanation, customQuestion);

    if (isNaN(endDate.getTime())) {
      alert('유효하지 않은 종료일 형식입니다. 올바른 날짜 형식(YYYY-MM-DD)을 사용하세요.');
      return;
    }

    if (picturePhoto) {
      formData.append('picture_photo', picturePhoto);
    }
    formData.append('name', name);
    formData.append('artist', artist);
    formData.append('gallery', gallery);
    formData.append('end_date', endDate.toISOString());
    formData.append('custom_explanation', customExplanation);
    formData.append('custom_question', customQuestion);

    try {
      const response = await fetch('/api/artwork', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        navigate('/adminview/list');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout className="layout">
        <AdminHeader/>
      <Content className="app-content">
        <Row gutter={32}>
          {/* 좌측 섹션 */}
          <Col span={12}>
            <Button type="link" className="back-button">뒤로 가기</Button>
            <Form layout="vertical" className="art-form">
              <Form.Item label="작품" name="picture_photo">
                <Input type="file" accept="image/*" />
              </Form.Item>
              <Form.Item label="작품 이름" name="name">
                <Input placeholder="작품 이름을 입력하세요" />
              </Form.Item>
              <Form.Item label="작가명" name="artist">
                <Input placeholder="저자 이름을 입력하세요" />
              </Form.Item>
              <Form.Item label="갤러리" name="gallery">
                <Input placeholder="전시 장소를 입력하세요" />
              </Form.Item>
              <Form.Item label="전시 기간" name="end_name">
                <Input placeholder="2023-04-05의 형태로 입력하세요" />
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
            <Button type="primary" className="submit-button" onClick={handleSubmit}>등록</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default AdminRegister;
