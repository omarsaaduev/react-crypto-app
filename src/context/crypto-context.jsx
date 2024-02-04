import {  createContext, useEffect, useState } from "react";
import { percentDifference } from "../utils";
import { fakeFetchCrypto, fetchAssets } from "../api";

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})


export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCrypto();
            const assets = await fetchAssets();

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
    <CryptoContext.Provider value={{loading, assets, crypto}}>
        {children}
    </CryptoContext.Provider>
  )
}
