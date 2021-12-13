import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import Pools from './components/Pools';
const queryClient = new QueryClient()


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
