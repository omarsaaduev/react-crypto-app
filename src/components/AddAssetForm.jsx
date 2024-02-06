import { Button, DatePicker, Divider, Flex, Form,InputNumber, Result, Select, Space, Typography } from "antd";
import { useContext, useRef, useState } from "react";
import { CryptoContext } from "../context/crypto-context";
import { useForm } from "antd/es/form/Form";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} in not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

export default function AddAssetForm({ onClose }) {
  const {crypto} = useContext(CryptoContext);
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef()

  if(submitted){
    return   (
      <Result
      status="success"
      title="New Asset Added!"
      subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
      extra={[
        <Button type="primary" key="console" onClick={onClose}>
          Close
        </Button>,

      ]}
      />)
  }

  if(!coin){
    return (
      <Select
    style={{
      width: 250,
    }}
    value="press / to open"
    optionLabelProp="label"
    onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
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
  
    )
  }

  function handleAmountChange(value){
    form.setFieldsValue({
      total: +(value * coin.price).toFixed(4)
    })
  }

  function onFinish(values){
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date
    }
    setSubmitted(true)
    assetRef.current = newAsset;

  }
  return (
     <Form
     form={form}
     name="basic"
     labelCol={{
       span: 5,
     }}
     wrapperCol={{
       span: 12,
     }}
     style={{
       maxWidth: 600,
     }}
     initialValues={{
       remember: true,
       price: +coin.price.toFixed(4),
     }}
     onFinish={onFinish}
  
     autoComplete="off"
   >
    
    <CoinInfo coin={coin}/>
    <Divider/>
    
    
     <Form.Item 
       label="Amount"
       name="amount"
       validateMessages={validateMessages}
       rules={[
         {
           required: true,
           type: "number",
           min: 0,
         },
       ]}
     >
       <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{width: 250}} />
     </Form.Item>
     <Form.Item
       label="Price"
       name="price"
     >
       <InputNumber disabled style={{width: 250}} />
     </Form.Item>
     
     <Form.Item
       label="Date & Time"
       name="date"
     >
         <DatePicker style={{width: 225}} placeholder={new Date()} disabled />
     </Form.Item>
     <Form.Item
       label="Total"
       name="total"
     >
       <InputNumber disabled style={{width: 250}} />
     </Form.Item>

     <Form.Item>
      <Button type="primary" htmlType="submit">
        Add Asset
      </Button>
     </Form.Item>

   </Form>
  )
}
