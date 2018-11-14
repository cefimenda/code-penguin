import React, { Component } from 'react';
import './Table.css';


export default class Table extends Component {
  renderTableInfo = () => {
    return this.props.data.map(data => (
      <tr className="tr-row" key={data.Entry.time}>
        <td key={data.Entry.time}>{new Date(data.Entry.time).toLocaleDateString()}</td>
        <td className="shortHash" key={data.Entry.origin}>
          {data.Entry.origin}
        </td>
        <td key={data.Entry.pebbles}>{data.Entry.pebbles}</td>
      </tr>
    ));
  };

  render() {
    return (
      <table>
        <tbody>
          <tr className="tr-header" style={{ width: '100px' }}>
            <th>Date</th>
            <th>Task Name</th>
            <th>Pebbles</th>
          </tr>
          {this.renderTableInfo()}
        </tbody>
      </table>
    );
  }
}
