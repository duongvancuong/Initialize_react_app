import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
const Table = ({ data }) => {
  const dataColumns = data.columns;
  const dataRows = data.rows;
  const tableHeaders = (<thead>
    <tr>
      {dataColumns.map((column, index) => (<th key={`th${index}`}>{column}</th>))}
    </tr>
  </thead>);
  const tableBody = dataRows.map((row, index) => (
    <tbody key={`tr${index}`}>
      <tr>
        {dataColumns.map((column, index) => (<td key={`td${index}`}>{row[column]}</td>))}
      </tr>
    </tbody>
  ));

  return (
    <table className="table table-bordered table-hover">
      {tableHeaders}
      {tableBody}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Table;
