/* eslint-disable */
export const getCryptocurrencyLatest = state => {
  const datas = state.cryptocurrency.data;
  const columns = ['name', 'market_cap', 'price', 'volume_24h', 'circulating_supply', 'percent_change_24h'];
  const rows = datas.map(data => {
    return {
      'name': data.name,
      'market_cap': data.quote.USD.market_cap,
      'price': data.quote.USD.price,
      'volume_24h': data.quote.USD.volume_24h,
      'circulating_supply': data.circulating_supply,
      'percent_change_24h': data.quote.USD.percent_change_24h,
    }
  });
  return {
    columns: columns,
    rows: rows
  }
}
