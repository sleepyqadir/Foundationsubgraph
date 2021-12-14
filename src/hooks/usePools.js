import { request, gql } from "graphql-request";
import { useQuery } from 'react-query';
import { endpoint } from '../config';
import { toUnixDay } from '../utils';


export function usePools(days, txCount, volume, totalValueLocked) {

    const unix_day = toUnixDay(days)

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
