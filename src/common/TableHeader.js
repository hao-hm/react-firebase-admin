import React, {Component, PropTypes} from 'react';
import { Button} from 'antd';
import SearchBox from "./SearchBox";

class TableHeader extends Component {
  render() {
    const {buttons, title, search} = this.props;
    return (
        <div style={{ marginBottom: 10, textAlign: 'right' }}>
          <h2 style={{float: 'left' }}>{title}</h2>
          {search && (<SearchBox style={{float: 'left', width: 200 }} {...search}/>)}
          {buttons.map((button, i) => (
            <Button type={button.type} key={i} onClick={button.onClick}>{button.name}</Button>
          ))}
        </div>
      )
  }
}

TableHeader.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  title: PropTypes.string,
  search: PropTypes.object
};
export default TableHeader