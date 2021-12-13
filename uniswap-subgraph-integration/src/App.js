import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { request, gql } from "graphql-request";
import { useEffect, useState } from 'react';
const queryClient = new QueryClient()
const endpoint = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";



function usePools(days, txCount, volume, totalValueLocked) {

  const unix_day = Math.floor(Date.now() / 1000 - parseFloat(days) * 86400);

  return useQuery("posts", async () => {
    const { pools } = await request(
      endpoint,
      gql`
      query{
        pools( where: {
            volumeUSD_gte: ${volume}
            totalValueLockedUSD_gte: ${totalValueLocked}
            txCount_gte: ${txCount}
            createdAtTimestamp_gte: ${unix_day}
          } 
        ) {
          token0 {
            symbol
          }
          token0Price
          token1 {
            symbol
          }
          token1Price
          id
          volumeUSD
          createdAtTimestamp
          totalValueLockedUSD
          txCount
        }}
      `
    );
    return pools;
  });
}


function Pools({ days, transactionCount, tvl, volume }) {
  const { status, data, error, isFetching, refetch } = usePools(days, transactionCount, volume, tvl);
  useEffect(() => {
    refetch()
  }, [days, transactionCount, tvl, volume])
  return (
    <div>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((pool) => (
                <p key={pool.id}>
                  {pool.token0.symbol}/{pool.token1.symbol} | Volume: {Math.trunc(pool.volumeUSD)}$ | Transactions: {pool.txCount} | TVL: {pool.totalValueLockedUSD}
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}



function App() {
  const [days, setDays] = useState(5)
  const [transactionCount, setTransactionCount] = useState(100)
  const [volume, setVolume] = useState(20000)
  const [tvl, setTvl] = useState(30000)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className="text-3xl font-bold underline">
          Uniswap Pools
        </h1>
        <label>Days:</label>
        <input
          value={days}
          type="number"
          onChange={(e) => { setDays(e.target.value); }} />
        <label>Transaction Count:</label>
        <input
          value={transactionCount}
          type="number"
          onChange={(e) => { setTransactionCount(e.target.value); }} />
        <label>Total Volume Locked:</label>
        <input
          value={tvl}
          type="number"
          onChange={(e) => { setTvl(e.target.value); }} />
        <label>Volume:</label>
        <input
          value={volume}
          type="number"
          onChange={(e) => { setVolume(e.target.value); }} />
        <br />
        <br />
        <br />
        <br />
        <Pools days={days} volume={volume} transactionCount={transactionCount} tvl={tvl} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
