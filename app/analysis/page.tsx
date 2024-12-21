"use client"

import {
    Flex,
    Layout,
    Radio,
    RadioChangeEvent,
    Typography,
    Input,
    AutoComplete, AutoCompleteProps
} from "antd";
import {useState} from "react";
import AppHeader from "@/components/Header";
import searchData from "@/public/statics/search.json";
import HyperlinkTable, {DataType} from "@/components/HyperlinkTable";

type Recommendations = {
    [language: string]: {
        [entityId: string]: {
            label: string;
            hyperlinks: {
                [hyperlinkId: string]: {
                    label: string[];
                    score: number;
                };
            };
        };
    };
};

// Import the JSON and cast it to the type
import recommendations from "@/public/statics/recommendation.json" assert { type: "json" };
const recs = recommendations as unknown as Recommendations;

const { Title } = Typography;
const { Content } = Layout;
const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    overflow: 'auto',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
    height: 'calc(100%)',
};

const searchResult = (query: string, language: "en" | "vi" | "ja") => {
    console.log(query, language)
    const titleList = searchData.map((item) => ({title: item[`label_${language}`], qid: item["Qid"]}))
        .filter((item) => String(item?.title.toLowerCase()).includes(query.toLowerCase()))
        .map((item) => {
            return {
                value: item?.qid,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
            <span>
                {item?.title}

            </span>
                        <span>{item?.qid}</span>
                    </div>
                ),
            };
        });
    return titleList

}

export default function Home() {

    const [language, setLanguage] = useState<"vi" | "ja" | "en">('en');

    const handleSizeChange = (e: RadioChangeEvent) => {
        setLanguage(e.target.value);
    };


    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [tableData, setTableData] = useState<DataType[]>([]);

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value, language) : []);
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
        console.log(value)
        // Find the results from the recommendations
        const results = recs[language][value];
        const hyperlinks = results["hyperlinks"];

        const dataMappings: DataType[] = [];
        let index = 1;
        for (const key of Object.keys(hyperlinks)) {
            dataMappings.push({
                key: index.toString(),
                qid: key,
                en: hyperlinks[key]["label"][0],
                vi: hyperlinks[key]["label"][1],
                ja: hyperlinks[key]["label"][2],
                score: hyperlinks[key]["score"],
            })
            index = index + 1;

        }
        setSelectedTitle(results["label"]);
        setTableData(dataMappings)
    };

    return (
        <Flex gap="middle" wrap className={"h-[100vh]"}>
            <Layout style={layoutStyle}>
                <AppHeader/>
                <Content style={contentStyle}>
                    <div className={"grid grid-cols-12 p-4 gap-4"}>
                        <div className={"col-span-4 flex flex-col gap-4 border border-solid p-4"}>
                            <div className="flex flex-col items-start gap-2">
                                <Title level={4}>Select Language</Title>
                                <Radio.Group value={language} onChange={handleSizeChange}>
                                    <Radio.Button value="vi">Vietnamese</Radio.Button>
                                    <Radio.Button value="ja">Japanese</Radio.Button>
                                    <Radio.Button value="en">English</Radio.Button>
                                </Radio.Group>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Title level={4}>Search Topic</Title>
                                <AutoComplete
                                    popupMatchSelectWidth={252}
                                    style={{ width: 300 }}
                                    options={options}
                                    onSelect={onSelect}
                                    onSearch={handleSearch}
                                    size="large"
                                >
                                    <Input.Search size="large" placeholder="input here" enterButton />
                                </AutoComplete>
                            </div>
                        </div>
                        <div className={"col-span-8 border border-solid text-start p-5"}>
                            {tableData.length > 0 && (
                                <div>
                                    <Title level={4}>Selected Title: {selectedTitle}</Title>
                                    <Title level={4}>Predicted Hyperlinks</Title>
                                    <HyperlinkTable tableData={tableData}/>
                                </div>
                            )}

                        </div>
                    </div>
                </Content>
            </Layout>
        </Flex>
    );
}
