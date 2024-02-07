import { Layout } from "antd";
import Typography from "antd/es/typography/Typography";
import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
  };
export default function AppContent() {
  const {assets, crypto} = useContext(CryptoContext)
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{textAlign: 'left', color: '#fff'}}>
        Portfolio: {' '}
        {assets.map(asset => {
          const coin = crypto.find(c => c.id === asset.id)
          return asset.amount * coin.price
        }).reduce((acc, sum) => acc+sum, 0).toFixed(2)}$
      </Typography.Title>
      <PortfolioChart/>
      <AssetsTable/>
    </Layout.Content>
  )
}
