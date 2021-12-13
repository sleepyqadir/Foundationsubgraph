import { useEffect } from 'react';
import { usePools } from '../hooks/usePools';


function Pools({ days, transactionCount, tvl, volume }) {
    const { status, data, error, isFetching, refetch } = usePools(days, transactionCount, volume, tvl);
    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default Pools

