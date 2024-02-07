import { Table } from 'antd';
import { useContext } from 'react';
import { CryptoContext } from '../context/crypto-context';

export default function AssetsTable() {
    const {assets} = useContext(CryptoContext);
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
];

const data = assets.map(asset => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount
}))
  return (
    <Table columns={columns} dataSource={data}  />
  )
}
