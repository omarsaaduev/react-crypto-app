import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useContext, useState } from "react";
import { CryptoContext } from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#fff",
};



export default function AppHeader() {
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const {crypto} = useContext(CryptoContext);

  function handleSelect(value){
    setCoin(crypto.find((c) => c.id === value))
    setModal((prev) => !prev)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        value="press / to open"
        optionLabelProp="label"
        onSelect={handleSelect}
        options={crypto.map(coin => (
          {
            label: coin.name,
            value: coin.id,
            icon: coin.icon
          }
        ))} 
        optionRender={(option) => (
          <Space>
            <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>
            {' '}
            {option.data.value}
          </Space>
        )}
      />
      <Button  type="primary" onClick={() => setDrawer((prev) => !prev)}>Add Asset</Button>
      <Modal  
        footer={null}
        open={modal} 
        onCancel={() => setModal((prev) => !prev)}
        >
        <CoinInfoModal coin={coin}/>
      </Modal>
      <Drawer width={600} onClose={() => setDrawer((prev) => !prev)} open={drawer} destroyOnClose="false">
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer >
    </Layout.Header>
  );
}
