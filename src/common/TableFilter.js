import React, {Component, PropTypes} from 'react';
import {Button, Select, Form} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class TableFilter extends Component {
  render() {
    const {filters, onFilter} = this.props;
    return (
      <div style={{marginBottom: 10}}>

        <Form layout="inline">


          {filters.map((item, i) => (

            <FormItem label={item.title} key={item.key}>
              <Select
                style={{width: 200}}
                placeholder="Please select"
                defaultValue={'all'}
                onChange={(value) => onFilter(item.key, item.dataIndex, value)}>
                <Option key='all'>All</Option>
                {item.list.map((child, index) => (
                  <Option key={child.value}>{child.text}</Option>
                ))}
              </Select>
            </FormItem>


          ))}
        </Form>
      </div>
    )
  }
}

TableFilter.propTypes = {
  title: PropTypes.string
};
export default TableFilter