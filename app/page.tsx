"use client"

import {
    Flex,
    Layout,
    Typography,
    Row, Col, Card
} from "antd";
import VixWordCloud from "@/components/VixWordCloud";
import data from "../statics/local_types.json"
import AppHeader from "@/components/Header";

const {Title} = Typography;
const {Content} = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    overflow: 'auto',
    padding: 20
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
    height: 'calc(100%)',
};


export default function Home() {
    const englishWordCloud = data["en"] && Object.values(data["en"]).map((item) => {
        return {text: item[0] as string, value: item[1] as number}
    })
    const vietnameseWordCloud = data["vi"] && Object.values(data["vi"]).map((item) => {
        return {text: item[0] as string, value: item[1] as number}
    })
    const japaneseWordCloud = data["ja"] && Object.values(data["ja"]).map((item) => {
        return {text: item[0] as string, value: item[1] as number}
    })

    return (
        <Flex gap="middle" wrap className={"h-[100vh]"}>
            <Layout style={layoutStyle}>
                <AppHeader/>
                <Content style={contentStyle}>
                    <Title level={2}>Word Cloud</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}
                        >
                            <Card title="Vietnamese" size="small">
                                <div className={"flex items-center justify-center"}>
                                    <VixWordCloud width={500} height={500} words={vietnameseWordCloud}/>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}
                        >
                            <Card title="English" size="small">
                                <div className={"flex items-center justify-center"}>
                                    <VixWordCloud width={500} height={500} words={englishWordCloud}/>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}
                        >
                            <Card title="Japanese" size="small">
                                <div className={"flex items-center justify-center"}>
                                    <VixWordCloud width={500} height={500} words={japaneseWordCloud}/>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                </Content>
            </Layout>
        </Flex>
    );
}
