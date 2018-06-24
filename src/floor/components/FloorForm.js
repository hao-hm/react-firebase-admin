import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import action from '../actions';
import selector from '../selector';
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from '../../util/actionType';
import {Form, Input, Button, InputNumber, Spin} from 'antd';
const FormItem = Form.Item;


class FloorForm extends Component {
  constructor(props) {
    super(props);
    const current = this.props.current || {};
    this.state = {
      key: current.key || 1,
      description: current.description
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.isCreate()) {
          // this.props.action.create({body: values})
          this.props.action.update({key: values.key, body: values});
        } else {
          this.props.action.update({key: this.props.current.key, body: values});
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
          <h2>{this.isCreate() ? 'Create Floor' : 'Edit Floor'}</h2>

          <FormItem {...formItemLayout} label="Floor Number">
            {getFieldDecorator('key', {
              rules: [{required: true, message: 'Please input Floor Number!'}],
              initialValue: state.key
            })(
              <InputNumber min={0} max={100}/>
            )}
          </FormItem>


          <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator('description', {
              rules: [{required: true, message: 'Please input Floor Description!'}],
              initialValue: state.description
            })(
              <Input />
            )}
          </FormItem>


          <FormItem {...tailFormItemLayout}>
            <Button type="primary" loading={this.props.loading} htmlType="submit">Submit</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleCancel}>Cancel</Button>
          </FormItem>
        </Form>
      </Spin>

    );
  }
}

//prop types
FloorForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FloorForm));