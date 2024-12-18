import React from 'react';
import {Button, Layout} from 'antd';
import Image from 'next/image';
import Link from "next/link";
import logo from "public/img/logo.png";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: "auto",
    paddingInline: 48,
    lineHeight: '64px',
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

const AppHeader: React.FC = () => {
    return (
        <Header style={headerStyle}>
            <Link href={"/"}>
            <Image
                src={logo}
                width="100"
                alt="N"
                height="50"
                className="w-[200px]"
            />
            </Link>
            <Link href="/analysis">
                <Button>Analysis</Button>
            </Link>
        </Header>
    );
};

export default AppHeader;
