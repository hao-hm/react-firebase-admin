import React, {Component, PropTypes} from 'react';
import {Table, Popconfirm, Alert, message, Button, Input, Icon} from 'antd';
import SearchBox, {createFilter} from "./SearchBox";
import get from 'lodash/get';
import TableHeader from "./TableHeader";
import TableFilter from "./TableFilter";


class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filterInfo: {}
    };
  }

  updateSearchText = (searchText) => {
    this.setState({searchText})
  };

  createActionColumn = (action) => {
    return {
      title: action.title || 'Action',
      key: action.key || 'action',
      fixed: 'right',
      width: action.width || 100,
      render: (text, record) => (
        <span>
          {action.list.map((item, i) => (
            <span key={i}>
              {item.confirm ? (
                <Popconfirm title={typeof item.confirm === 'string' ? item.confirm : 'Are you sure?'}
                            onConfirm={() => item.onClick(record)} okText="Yes" cancelText="No">
                  <a href="#">{item.name}</a>
                </Popconfirm>
              ) : <a href="#" onClick={() => item.onClick(record)}>{item.name}</a>}
              {i < action.list.length - 1 && <span className="ant-divider"/>}
            </span>
          ))}
          </span>
      )
    }
  };

  updateFilterInfo = (key, dataIndex, value) => {
    const filterInfo = {...this.state.filterInfo, [dataIndex]: value};
    this.setState({filterInfo});
    this.props.filter.onFilter(key, dataIndex, value);
  };


  render() {
    const {header, table, filter} = this.props;
    const {dataSource, columns, action, ...otherTable} = table;
    const {search, ...otherHeader} = header;

    //search
    const searchHeader = {
      ...search,
      onSearch: this.updateSearchText
    };
    const keys = get(header, 'search.keys') || table.columns.map(column => column.dataIndex);
    const data = dataSource.filter(createFilter(this.state.searchText, keys));
    //add columns
    const columnsTable = [...columns, this.createActionColumn(action)];

    //filter
    const {filterInfo} = this.state;
    console.log(filterInfo);
    const filteredData = data.filter(item => {
      return Object.keys(filterInfo).every(dataIndex => {
        const filterValue = filterInfo[dataIndex];
        return filterValue !== 'all' ? filterValue == get(item, dataIndex): true;
      })
    });


    return (
      <div>
        <TableHeader search={searchHeader} {...otherHeader} />
        {filter && <TableFilter filters={filter.filters} onFilter={this.updateFilterInfo}/>}
        <Table columns={columnsTable} dataSource={filteredData} {...otherTable}/>
      </div>
    );
  }
}


export default TableView;
