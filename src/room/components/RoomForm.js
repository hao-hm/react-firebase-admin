import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from '../selector';
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from '../../util/actionType';
import {Form, Select, Input, Button, Spin, InputNumber} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {getNewKey} from '../../util/util';


function getFloorNumber(roomNumber) {
  const roomString = roomNumber.toString(),
    length = roomString.length;
  return parseInt(roomString.slice(0, length - 2))
}

class RoomForm extends Component {
  constructor(props) {
    super(props);
    const current = this.props.current || {};
    this.state = {
      roomNumber: current.roomNumber || 100,
      floorNumber: current.floorNumber || getFloorNumber(100),
      description: current.description
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        const newFloorNumber = values.floorNumber;
        if (this.isCreate()) {
          const newRoomKey = getNewKey('rooms');
          const updates = {
            [`floor/${newFloorNumber}/rooms/${newRoomKey}`]: true,
            [`rooms/${newRoomKey}`]: values
          };
          // this.props.action.create({body: values})
          this.props.action.updates(updates);
        } else {
          const currentRoomKey = this.props.current.key;

          const currentFloorNumber = this.state.floorNumber;
          const updates = {
            [`floor/${newFloorNumber}/rooms/${currentRoomKey}`]: true,
            [`rooms/${currentRoomKey}`]: values
          };
          if (newFloorNumber !== currentFloorNumber) {
            updates[`floor/${currentFloorNumber}/rooms/${currentRoomKey}`] = null;
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

  handleRoomChange = (value) => {
    this.props.form.setFieldsValue({
      floorNumber: getFloorNumber(value)
    });
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const state = this.state;
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

    return (
      <Spin spinning={this.props.loading}>
        <Form onSubmit={this.handleSubmit} style={{maxWidth: 960}}>
          <h2>{this.isCreate() ? 'Create Room' : 'Edit Room'}</h2>

          <FormItem {...formItemLayout} label="Room Number">
            {getFieldDecorator('roomNumber', {
              rules: [{required: true, message: 'Please input Room Number!'}],
              initialValue: state.roomNumber,
              onChange: this.handleRoomChange,
            })(
              <InputNumber min={100} max={999}/>
            )}
          </FormItem>


          <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator('description', {
              rules: [{required: true, message: 'Please input Room Description!'}],
              initialValue: state.description
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="Floor" {...formItemLayout}>
            {getFieldDecorator('floorNumber', {
              initialValue: state.floorNumber
            })(
              <span className="ant-form-text">{getFieldValue('floorNumber')}</span>
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
RoomForm.propTypes = {
  mode: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

///////////////////
const mapStateToProps = (state) => ({
  current: selector.getCurrentItem(state),
  mode: selector.getCurrentMode(state),
  loading: selector.getLoading(state) > 0
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RoomForm));