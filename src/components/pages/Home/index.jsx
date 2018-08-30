import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../../common/Table';
import { getCryptocurrencyLatest } from '../../../selectors/coinMakerSelector';
import { fetchCryptocurrencyAction } from '../../../stores/cryptocurrency/actions';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCryptocurrencyAction());
  }

  fetchWebWorker = () => {
    this.worker.postMessage('fetch User');
    this.worker.addEventListener('message', (e) => {
      this.setState({
        count: e.data.length,
      });
    });
  }

  render() {
    const dataTable = this.props.dataTable;
    return (
      <div>
        <Table data={dataTable} />
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataTable: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const dataTable = getCryptocurrencyLatest(state);
  return {
    dataTable,
  };
};

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;
