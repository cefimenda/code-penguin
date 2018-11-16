import React, { Component } from 'react';
import './Table.css';


export default class Table extends Component {
  // renderTableInfo = () => {
  //   return this.props.data.map(data => (
  //     <tr className="tr-row" key={data.Entry.time}>
  //       <td key={data.Entry.time}>{new Date(data.Entry.time).toLocaleDateString()}</td>
  //       <td className="shortHash" key={data.Entry.origin}>
  //         {data.Entry.origin}
  //       </td>
  //       <td key={data.Entry.pebbles}>{data.Entry.pebbles}</td>
  //     </tr>
  //   ));

  renderTableInfo = () => {

    if(!this.props.withdrawals && !this.props.deposits) return

    let newWithdrawals = this.props.withdrawals.map(wd => {
      return wd = {...wd, type: 'withdraw', hash: wd.Hash, style:'red'}
    })


    let newDeposits = this.props.deposits.map(dp => {
      return dp = {...dp, type: 'deposit', hash: dp.Hash, style:'green'}
    })
    
    const total = newWithdrawals.concat(newDeposits)
    console.log(total)
    return total.map(data => (
      <tr className="tr-row" key={data.Hash}>
        <td key={data.Entry.time}>{new Date(data.Entry.time).toLocaleDateString()}</td>
        {/* <td className="shortHash" key={data.Entry.origin}>{data.Entry.origin} {data.taskTitle} ~ {data.hash}</td> */}
        <td className="shortHash" key={data.Entry.origin}>{data.Entry.origin} {data.taskTitle}</td>
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
