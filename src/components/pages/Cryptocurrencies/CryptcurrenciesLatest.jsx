import React from 'react';

import Table from '../../common/Table';
import { getCryptocurrencyLatestSelector } from '../../../selectors/coinMakerSelector';
import {
  getAllCryptocurrenciesLatestFakeSuc,
  getAllCryptocurrenciesLatestFakeFail,
} from '../../../services/api/coinMakeCapApi';
import Async from '../../../utils/asyncHoc';

const resolveFn = getAllCryptocurrenciesLatestFakeSuc(1000);
const rejectFn = getAllCryptocurrenciesLatestFakeFail(1000);
const CryptcurrenciesLatest = () => (
  <Async promiseFn={rejectFn} deferFn={resolveFn}>
    {({ data, error, isLoading, reload }) => {
      if (isLoading) return <p>Loading...</p>;
      if (error) {
        return (
          <div>
            <p>Something went wrong!</p>
            <button type="button" onClick={reload}>try again</button>
          </div>
        );
      }
      if (data) {
        const dataCryto = getCryptocurrencyLatestSelector(Object.assign({}, { cryptocurrency: data }));
        return <Table data={dataCryto} />;
      }
      return null;
    }}
  </Async>
);
export default CryptcurrenciesLatest;
