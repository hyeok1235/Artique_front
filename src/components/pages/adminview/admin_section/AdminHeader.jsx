import React from "react";

import { Layout } from "antd";
const { Header } = Layout;

function AdminHeader(props) {
    const headerStyle = {
        backgroundColor: 'white',
        borderTop: '8px solid #e42a2a',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        paddingLeft: '20px',
    };

    const logoStyle = {
        color: 'black',
        position: 'relative',
        bottom: '5px',
    }

    return (
        <Header style={headerStyle}>
            <div className="logo" style={logoStyle}>Artique</div>
            {props.children}
        </Header>
    );
}

export default AdminHeader;