import React, { Component } from 'react';
import Table from './_components/table0/Table';
import TableSchema from './_components/schema/TableSchema';

const tableColumn = [
    {
        fieldIndex: 0,
        fieldName: 'id',
        text: '任务id',
        _pk: true
    },
    {
        fieldIndex: 1,
        fieldName: 'name',
        text: '应用名字'
    }
];

class App extends Component {

  constructor(props) {

    super(props);
    this.table = TableSchema();
    this.table.columns = tableColumn;
    this.table.operator = ['modal','delete'];
    this.table.data = [{id:1, name: 'n1'}, {id:2, name: 'n2'}];
    this.state = {
      datasource: this.table,
      loading: false
    };

  }

  bthClick = () => {
    let l = this.state.loading;
    this.setState({
      ...this.state,
      loading: !l
    });
  }

  render() {
    return (
      <div className="App" style={{width:'600px'}}>
        <input type="button" value={`click (${this.state.loading})`} onClick={ (e) => { this.bthClick(e) } } />
        <Table schema={this.state.datasource} loading = { this.state.loading }>Table</Table>
      </div>
    );
  }
}

export default App;
