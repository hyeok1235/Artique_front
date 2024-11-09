import React from 'react';
import '../../../style/AdminList.css';
import { Layout, Menu, List, Avatar, Button, Typography } from 'antd';
import AdminHeader from './admin_section/AdminHeader';

const { Content } = Layout;
const { Title } = Typography;

function AdminList() {
  const artworks = [
    { title: '별이 빛나는 밤', author: '고흐', gallery: '00갤러리', date: '2024.11.09' },
    { title: '모나리자', author: '다빈치', gallery: 'xx갤러리', date: '2024.11.08' },
    { title: '이삭 줍는 여인', author: '홍길동', gallery: '갤릿', date: '2022' },
    { title: '피카소 그림', author: '홍길동', gallery: '갤릿', date: '2022' },
  ];

  return (
    <Layout className="layout">
      <AdminHeader/>
      {/* <Header style={{ backgroundColor: '#d32f2f' }}>
        <div className="logo">Artique</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ backgroundColor: '#d32f2f' }}>
          <Menu.Item key="1">전체도서</Menu.Item>
          <Menu.Item key="2">마이페이지</Menu.Item>
          <Menu.Item key="3">로그아웃</Menu.Item>
        </Menu>
      </Header> */}
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div className="artwork-list">
          <div className="list-header">
            <Title level={3}>작품 목록</Title>
            <Button type="primary" style={{ backgroundColor: '#d32f2f', borderColor: '#d32f2f' }}>
              새로 만들기
            </Button>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={artworks}
            renderItem={item => (
              <List.Item
                actions={[<Button type="link" style={{ color: '#d32f2f' }}>수정</Button>]}
              >
                <List.Item.Meta
                  avatar={<Avatar shape="circle" size="large" style={{ backgroundColor: '#ddd' }} />}
                  title={<a href="#">{item.title}</a>}
                  description={`${item.author} | ${item.gallery} | ${item.date}`}
                />
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default AdminList;
