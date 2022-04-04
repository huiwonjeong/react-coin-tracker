import { useQuery } from "react-query";
import { fetchCoinToday, fetchCoinTickers } from "../api";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}
const Overview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: ${(props) => `1px solid ${props.theme.textColor}`};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const OverviewItem2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 100%;
  span:first-child {
    margin-bottom: 10px;
    font-size: 13px;
  }
`;
const CurPrice = styled.div<{ isUp: boolean }>`
  font-size: 34px;
  color: ${(props) => (props.isUp ? "#00B061" : "#EA3943")};
  display: flex;
  align-items: center;
  span {
    display: block;
  }
  span:first-child {
    font-size: 18px;
    margin-right: 5px;
  }
`;
const Percent = styled.div<{ isUp: boolean }>`
  background-color: ${(props) => (props.isUp ? "#00B061" : "#EA3943")};
  padding: 10px;
  border-radius: 7px;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Loader = styled.div`
  text-align: center;
  display: block;
`;
const Line = styled.div`
  border-top: ${(props) => `1px solid ${props.theme.textColor}`};
  margin: 10px 0;
  opacity: 0.7;
`;

interface Quotes {
  USD: Usd;
}

interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: Quotes;
}

interface TodayInfo {
  time_open: Date;
  time_close: Date;
  high: number;
  low: number;
  close: number;
  open: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );
  const isUp = (data?.quotes.USD.percent_change_24h ?? 0) > 0 ? true : false;
  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <CurPrice isUp={isUp}>
                <span>{isUp ? "▲ " : "▼ "}</span>
                <span>
                  $
                  {data?.quotes.USD.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </CurPrice>
              <Percent isUp={isUp}>
                {isUp ? "▲ " : "▼ "}
                {data?.quotes.USD.percent_change_24h.toFixed(2)}%
              </Percent>
            </OverviewItem>
            <Line />
            <OverviewItem2>
              <span>Market cap :</span>
              <span>
                $
                {data?.quotes.USD.market_cap.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </OverviewItem2>
            <Line />
            <OverviewItem2>
              <span>All time high :</span>
              <span>
                $
                {data?.quotes.USD.ath_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </OverviewItem2>
            <Line />
            <OverviewItem2>
              <span>All time high date :</span>
              <span>
                {new Date(data?.quotes.USD.ath_date ?? "").toLocaleString()}
              </span>
            </OverviewItem2>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Price;
