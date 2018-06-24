import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from  '../selector'
import {EDIT_MODE} from '../../util/actionType'
import {Alert, message} from 'antd';
import {CREATE_MODE} from '../../util/actionType';
import TableView from '../../common/TableView'

class FloorList extends Component {

  componentWillMount() {
    this.props.action.fetch();
  }

  handleDelete = async (item) => {
    await this.props.action.delete({key: item.key});
    message.success('Delete success');
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter)
  };

  onEditClick = (item) => {
    this.props.action.setCurrent(item);
    this.props.action.changeMode(EDIT_MODE);
  };


  render() {
    let {loading, error, list} = this.props;
    const columns = [
      {
        title: 'Floor Number',
        dataIndex: 'key',
        key: 'key',
        sorter: (a, b) => a.key - b.key
      },
      {
        title: 'Rooms',
        dataIndex: 'rooms',
        key: 'rooms',
        render: (text, record) => (
          <span>{Object.values(record.rooms || {}).filter(value => value === true).length} rooms</span>
        )
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      }
    ];

    const tableView = {
      header: {
        title: 'Floors',
        buttons: [
          {name: 'Create', type: 'primary', onClick: () => this.props.action.changeMode(CREATE_MODE)}
        ]
      },
      table: {
        columns,
        loading,
        dataSource: list,
        onChange: this.handleTableChange,
        action: {
          title: 'Action',
          list: [
            {name: 'Edit', onClick: this.onEditClick},
            {name: 'Delete', onClick: this.handleDelete, confirm: true}
          ]
        }
      }
    };

    return (
      <div>
        {error && (<Alert message={error} type="error"/>)}
        <TableView table={tableView.table} header={tableView.header}/>
      </div>

    );
  }
}


//prop types
FloorList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

///////////////
const mapStateToProps = (state) => {
  return {
    list: selector.getDataAsArray(state),
    loading: selector.getLoading(state) > 0,
    error: selector.getError(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FloorList);
