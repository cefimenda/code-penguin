import React, { Component } from 'react';
import './Table.css';


export default class Table extends Component {
  renderTableInfo = () => {

    if(!this.props.withdrawals && !this.props.deposits) return

    let newWithdrawals = this.props.withdrawals.map(wd => {
      return wd = {...wd, type: 'withdraw', style:'red'}
    })


    let newDeposits = this.props.deposits.map(dp => {
      return dp = {...dp, type: 'deposit', style:'green'}
    })
    
    const total = newWithdrawals.concat(newDeposits)
    return total.map(data => (
      <tr className="tr-row" key={data.Hash}>
        <td>{new Date(data.Entry.time).toLocaleDateString()}</td>
        <td className="shortHash"><a href={data.Entry.taskTitle === "Active Reward" ? "/landing" : `/task/${data.type==="withdraw" ? data.Entry.destination : data.Entry.origin}`}>{data.Entry.taskTitle}</a></td>
        <td style={{color: data.style}}><b>{data.type === "withdraw" ? "-" : ""} {data.Entry.pebbles}</b></td>
      </tr>
    ));
  };

  render() {
    return (
      <table>
        <tbody>
          <tr className="tr-header" style={{ width: '100px'}}>
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
