import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
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
        title: 'Label(Vi)',
        dataIndex: 'ja',
        key: 'ja',
    },
    {
        title: 'Confidence',
        dataIndex: 'score',
        key: 'score',
    }
];

const HyperlinkTable: React.FC = ({tableData}) => <Table<DataType> columns={columns} dataSource={tableData} />;

export default HyperlinkTable;
