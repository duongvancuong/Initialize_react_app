import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../common/Table';
import { getCryptocurrencyLatestSelector } from '../../../selectors/coinMakerSelector';
import { fetchCryptocurrencyAction } from '../../../stores/cryptocurrency/actions';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCryptocurrencyAction());
  }

  render() {
    const { dataTable } = this.props;
    return (
      <div>
        <Table data={dataTable} />
      </div>
    );
  }
}

Home.propTypes = {
  dataTable: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const dataTable = getCryptocurrencyLatestSelector(state);
  return {
    dataTable,
  };
};

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;
