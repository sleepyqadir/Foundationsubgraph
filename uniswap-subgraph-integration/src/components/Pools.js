import { useEffect } from 'react';
import { usePools } from '../hooks/usePools';
import { ListGroup, Badge, Spinner } from 'react-bootstrap'


function Pools({ days, transactionCount, tvl, volume }) {
    const { status, data, error, isFetching, refetch } = usePools(days, transactionCount, volume, tvl);
    useEffect(() => {
        if (days && transactionCount && tvl && volume) {
            console.log("fetch again")
            refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days, transactionCount, tvl, volume])
    return (
        <div>
            <div>
                {status === "loading" ? (

                    <Spinner style={{ margin: "100px" }} animation="border" variant="danger" size="lg" />
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>

                        <ListGroup as="ul" numbered>
                            <h2 style={{ margin: "50px" }}>Total Pools: {data.length}</h2>
                            {data.map((pool) => (

                                <ListGroup.Item
                                    as="li"
                                    key={pool.id}
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{pool.token0.symbol}/{pool.token1.symbol}</div>
                                        Volume: {Math.trunc(pool.volumeUSD)}$ | TVL: {Math.trunc(pool.totalValueLockedUSD)}
                                    </div>
                                    <Badge variant="primary" pill>
                                        {pool.txCount}
                                    </Badge>
                                </ListGroup.Item>

                            ))}
                        </ListGroup>

                        <div>{isFetching ? "Background Updating..." : " "}</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Pools

