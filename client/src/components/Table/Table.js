import React, { Component } from 'react';
import './Table.css';


export default class Table extends Component {

  renderTableInfo = () => {

    if(!this.props.withdrawals && !this.props.deposits) return

    let newWithdrawals = this.props.withdrawals.map(wd => {
      return wd = {...wd, type: 'withdraw', style:'red'}
    })

    let newDeposits = this.props.deposits.map(d => {
      return d = {...d, type: 'deposit', style:'green'}
    })
    
    const total = newWithdrawals.concat(newDeposits)

    return total.map(data => (
      <tr className="tr-row" key={data.Hash}>
        <td key={data.Entry.time}>{new Date(data.Entry.time).toLocaleDateString()}</td>
        <td className="shortHash" key={data.Entry.origin}>{data.Entry.origin} {data.title}</td>
        <td key={data.Entry.pebbles} style={{color: data.style}}>{data.type} {data.Entry.pebbles}</td>
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
