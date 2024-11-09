import React from "react";

import { Layout } from "antd";
const { Header } = Layout;

function AdminHeader(props) {
    const headerStyle = {
        backgroundColor: 'white',
        height: '80px',
        borderTop: '11px solid #e42a2a',
        boxShadow: '0 0px 10px rgba(0, 0, 0, 0.1)',
        paddingLeft: '20px',
        boxSizing: 'border-box',
    };

    const logoStyle = {
        color: 'black',
    }

    return (
        <Header style={headerStyle}>
            <div className="logo" style={logoStyle}>Artique</div>
            {props.children}
        </Header>
    );
}

export default AdminHeader;