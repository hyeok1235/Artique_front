import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../../style/AdminList.css';
import { Layout, Menu, List, Avatar, Button, Typography } from 'antd';
import AdminHeader from './admin_section/AdminHeader';

const { Content } = Layout;
const { Title } = Typography;

function AdminList() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      const token = localStorage.getItem('access_token');
      console.log(token);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/all_pictures`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      if(!response.ok) {
        console.log('Error');
        return;
      }
      const data = await response.json();
      console.log('data: ',data);
      setArtworks(Array.isArray(data.pictures) ? data.pictures : []);
    };

    fetchArtworks();
  }, []);

  console.log(artworks);

  return (
    <Layout className="layout">
      <AdminHeader>
        <a href="/adminview/login" className="logout-link">로그아웃</a>
      </AdminHeader>
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div className="artwork-list">
          <div className="list-header">
            <Title level={3}>작품 목록</Title>
            <Button type="primary" style={{ backgroundColor: '#d32f2f', borderColor: '#d32f2f' }} onClick={() => navigate("/adminview/register")}>
              새로 만들기
            </Button>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={artworks}
            renderItem={item => (
              <List.Item
                actions={[<Button type="link" style={{ color: '#d32f2f' }} onClick={() => navigate("/adminview/register", { state: { item } })}>수정</Button>]}
              >
                <List.Item.Meta
                  avatar={<Avatar shape="circle" size="large" src={item.picture_photo} />}
                  title={<a href="#">{item.title}</a>}
                  description={`${item.artist} | ${item.gallery} | ${item.end_date}`}
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
