import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import roomAction from '../../room/actions';
import floorAction from '../../floor/actions';
import selector from  '../selector'
import roomSelector from  '../../room/selector'
import floorSelector from  '../../floor/selector'
import {EDIT_MODE} from '../../util/actionType'
import {Alert, message} from 'antd';
import {CREATE_MODE} from '../../util/actionType';
import TableView from '../../common/TableView'
import get from 'lodash/get'

class CustomerList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.action.fetch();
    this.props.roomAction.fetch();
    this.props.floorAction.fetch();
  }

  handleDelete = async (item) => {
    await this.props.action.delete({key: item.key});
    message.success('Delete success');
    const updates = {
      [`rooms/${item.roomKey}/customers/${item.key}`]: null
    };
    this.props.action.updates(updates);
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter)
  };

  onEditClick = (item) => {
    this.props.action.setCurrent(item);
    this.props.action.changeMode(EDIT_MODE);
  };

  getFilterFloorList = (items) => {
    return items.map(item => {
      return {
        text: `Floor ${item.key} (${Object.values(item.rooms || {}).filter(value => value === true).length} rooms)`,
        value: item.key
      }
    })
  };

  getFilterRoomList = (items) => {
    return items.map(item => {
      return {
        text: `Room ${item.roomNumber} (${Object.values(item.customers || {}).filter(value => value === true).length} customers)`,
        value: item.key
      }
    })
  };


  render() {
    const {loading, error, list, roomList, floorList, room} = this.props;
    const dataSource = list.map(customer => {
      return {...customer, room: room[customer.roomKey]}
    });

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: 'Room',
        dataIndex: 'room.roomNumber',
        key: 'roomNumber'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'ID Number',
        dataIndex: 'idNumber',
        key: 'idNumber',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (text, record) => (text === 'male' ? 'Male' : 'Female')
      }
    ];

    const tableView = {
      header: {
        title: 'Customers',
        buttons: [
          {name: 'Create', type: 'primary', onClick: () => this.props.action.changeMode(CREATE_MODE)}
        ],
        search: {
          keys: ['name', 'room.roomNumber', 'address', 'phone', 'gender', 'idNumber']
        }
      },
      table: {
        columns,
        loading,
        dataSource,
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
    let filters = [
      {
        key: 'floor',
        title: 'Floor',
        dataIndex: 'room.floorNumber',
        list: this.getFilterFloorList(floorList)
      },
      {
        key: 'room',
        dataIndex: 'roomKey',
        title: 'Room',
        list: this.getFilterRoomList(roomList)
      }
    ];

    const onFilter = (key, dataIndex, value) => {
      if (key === 'floor') {
        filters = [...filters];
        filters[1].list = this.getFilterRoomList(roomList.filter(room => value !== 'all' ? room.floorNumber == value : true));
      }
    };

    return (
      <div>
        {error && (<Alert message={error} type="error"/>)}
        <TableView table={tableView.table} header={tableView.header} filter={{filters, onFilter}}/>
      </div>

    );
  }
}


//prop types
CustomerList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

///////////////
const mapStateToProps = (state) => {
  return {
    list: selector.getDataAsArray(state),
    roomList: roomSelector.getDataAsArray(state),
    room: roomSelector.getData(state),
    floorList: floorSelector.getDataAsArray(state),
    loading: selector.getLoading(state) > 0,
    error: selector.getError(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch),
  roomAction: bindActionCreators(roomAction, dispatch),
  floorAction: bindActionCreators(floorAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
