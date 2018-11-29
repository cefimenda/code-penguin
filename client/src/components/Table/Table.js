import React, { Component, Fragment } from 'react';
import './Table.css';

export default class Table extends Component {
  state = {
    start: 0,
    finish: 10,
    previousItems: false,
    nextItems: true,
    itemsPerPage: 10
  };

  renderTableInfo = () => {
    if (!this.props.withdrawals && !this.props.deposits) return;

    let newWithdrawals = this.props.withdrawals.map(wd => {
      return (wd = { ...wd, type: 'withdraw', style: 'red' });
    });

    let newDeposits = this.props.deposits.map(dp => {
      return (dp = { ...dp, type: 'deposit', style: 'green' });
    });

    let total = newWithdrawals.concat(newDeposits);
    // Sorts in reverse chronological order
    total.sort((a,b)=>b.Entry.time-a.Entry.time);

    total = total.slice(this.state.start, this.state.finish);
    return total.map(data => (
      <tr className="tr-row" key={data.Hash}>
        <td>{new Date(data.Entry.time).toLocaleDateString() + " at " + new Date(data.Entry.time).toLocaleTimeString()}</td>
        <td className="shortHash">
          <a
            href={
              data.Entry.taskTitle === 'Active Reward'
                ? '/landing'
                : `/task/${data.type === 'withdraw' ? data.Entry.destination : data.Entry.origin}`
            }
          >
            {data.Entry.taskTitle}
          </a>
        </td>
        <td style={{ color: data.style }}>
          <b>
            {data.type === 'withdraw' ? '-' : ''} {data.Entry.pebbles}
          </b>
        </td>
      </tr>
    ));
  };

  onPrevious = () => {
    this.setState(prevState => ({
      start: prevState.start - this.state.itemsPerPage,
      finish: prevState.finish - this.state.itemsPerPage
    }));
  };

  onNext = () => {
    this.setState(prevState => ({
      start: prevState.start + this.state.itemsPerPage,
      finish: prevState.finish + this.state.itemsPerPage
    }));
  };

  render() {
    const { withdrawals, deposits } = this.props;
    const { start, finish, itemsPerPage } = this.state;
    let total = withdrawals.length + deposits.length;
    return (
      <Fragment>
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
        <div className="page-num">Page {(finish / itemsPerPage)}</div>
        <div className="table-buttons">
          {start <= 0 ? null : (
            <button className="previous" onClick={this.onPrevious}>
              Previous
            </button>
          )}
          {finish >= total ? null : (
            <button className="next" onClick={this.onNext}>
              Next
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}
