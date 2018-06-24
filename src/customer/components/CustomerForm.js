import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import roomAction from '../../room/actions';
import selector from  '../selector'
import roomSelector from  '../../room/selector'
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from '../../util/actionType';
import {Form, Select, Input, Button, Radio, Spin} from 'antd';
import {getNewKey} from '../../util/util';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class CustomerForm extends Component {
  constructor(props) {
    super(props);
    const current = this.props.current || {};
    this.state = {
      name: current.name,
      address: current.address,
      phone: current.phone,
      idNumber: current.idNumber,
      gender: current.gender,
      roomKey: current.roomKey
    };
  }

  componentWillMount() {
    this.props.action.request(this.props.roomAction.fetch);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.isCreate()) {
          const newCustomerKey = getNewKey('customers');
          const updates = {
            [`rooms/${values.roomKey}/customers/${newCustomerKey}`]: true,
            [`customers/${newCustomerKey}`]: values
          };
          this.props.action.updates(updates)
        } else {
          const currentCustomerKey = this.props.current.key;
          const currentRoom = this.props.current.roomKey;
          const newRoom = values.roomKey;
          const updates = {
            [`rooms/${newRoom}/customers/${currentCustomerKey}`]: true,
            [`customers/${currentCustomerKey}`]: values
          };
          if(currentRoom !== newRoom){//delete old room
            updates[`rooms/${currentRoom}/customers/${currentCustomerKey}`] = null
          }
          this.props.action.updates(updates);
          this.props.action.setCurrent(null);
        }

      }
    });
  };

  isCreate = () => {
    return this.props.mode === CREATE_MODE;
  };

  isEdit = () => {
    return this.props.mode === EDIT_MODE;
  };

  handleCancel = () => {
    this.props.action.changeMode(VIEW_MODE);
    this.props.action.setCurrent(null);
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const state = this.state;
    return (
      <Spin spinning={this.props.loading}>
        <Form onSubmit={this.handleSubmit} style={{maxWidth: 960}}>

          <h2>{this.isCreate() ? 'Create Customer' : 'Edit Customer'}</h2>

          <FormItem {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'Please input Customer Name!'}],
              initialValue: state.name
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="Room"{...formItemLayout}>
            {getFieldDecorator('roomKey', {
              rules: [{required: true, message: 'Please select a room!'}],
              initialValue: state.roomKey,
            })(
              <Select placeholder="Select a room" showSearch>
                {this.props.roomList.map((room) => (
                  <Option key={room.key}>{room.roomNumber}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Address">
            {getFieldDecorator('address', {
              rules: [{required: true, message: 'Please input Customer Address!'}],
              initialValue: state.address
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{required: true, message: 'Please input Customer Phone Number!'}],
              initialValue: state.phone
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="ID Number">
            {getFieldDecorator('idNumber', {
              rules: [{required: true, message: 'Please input Customer ID Number!'}],
              initialValue: state.idNumber
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="Gender"{...formItemLayout}>
            {getFieldDecorator('gender', {
              rules: [{required: true, message: 'Please select Customer Gender!'}],
              initialValue: state.gender,
            })(
              <RadioGroup>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </RadioGroup>
            )}
          </FormItem>


          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleCancel}>Cancel</Button>
          </FormItem>
        </Form>
      </Spin>

    );
  }
}

//prop types
CustomerForm.propTypes = {
  mode: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

///////////////////
const mapStateToProps = (state) => ({
  current: selector.getCurrentItem(state),
  roomList: roomSelector.getDataAsArray(state),
  mode: selector.getCurrentMode(state),
  loading: selector.getLoading(state) > 0
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch),
  roomAction: bindActionCreators(roomAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CustomerForm));