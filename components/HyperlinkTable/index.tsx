import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

export interface DataType {
    key: string;
    en: string;
    vi: string;
    ja: string;
    score: number;
    qid: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Qid',
        dataIndex: 'qid',
        key: 'qid',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Label(En)',
        dataIndex: 'en',
        key: 'en',
    },
    {
        title: 'Label(Vi)',
        dataIndex: 'vi',
        key: 'vi',
    },
    {
        title: 'Label(Ja)',
        dataIndex: 'ja',
        key: 'ja',
    },
    {
        title: 'Confidence',
        dataIndex: 'score',
        key: 'score',
    }
];

const HyperlinkTable: React.FC<{ tableData: DataType[] }> = ({ tableData }) => <Table<DataType> columns={columns} dataSource={tableData} />;

export default HyperlinkTable;
