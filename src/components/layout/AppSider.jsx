import { Card, Layout, List, Statistic, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { cryptoAssets, cryptoData } from "../../data";
import { percentDifference } from "../../utils";

const siderStyle = {
    padding: '1rem',
    
  };

export default function AppSider() {
    const [loading, setLoading] = useState();
    const [crypto, setCrypto] = useState();
    const [assets, setAssets] = useState();

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await cryptoData;
            const assets = await cryptoAssets;

            setCrypto(result);
            setAssets(assets.map(asset => {
              const coin = result.find(c => c.id === asset.id)
              return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: coin.price * asset.amount,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                ...asset
              }
            }));
            setLoading(false)
        }
        preload();
    }, [])
    
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets?.map(asset => (
            <Card key={asset.id} style={{marginBottom: '1rem'}}>
            <Statistic
                title={asset.id}
                value={asset.amount}
                precision={2}
                valueStyle={{
                    color: asset.grow ? '#3f8600' : '#cf1322',
                }}
                prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined/>}
                suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {title: 'Total Profit', value: asset.totalProfit, withTag:true},
                {title: 'Asset Amount', value: asset.amount, isPlain: true},
                {title: 'Difference', value: asset.growPercent}
              ]}
              renderItem={(item) => (
            <List.Item>
              <span>{item.title}</span>
              <span>
                {item.withTag && 
                  <Tag color={asset.grow? 'green' : 'red'}>
                    {asset.growPercent}%
                  </Tag>
                }
                {item.isPlain && item.value}
                {!item.isPlain && 
                  <Typography.Text type={asset.grow? 'success': 'danger'}>
                    {item.value.toFixed(2)}$
                  </Typography.Text>
                }
               
              </span>
            </List.Item>
          )}
        />
        </Card>
      ))}

    </Layout.Sider>
  )
}
