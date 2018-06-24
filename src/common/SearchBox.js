import React, {Component, PropTypes} from 'react';
import { Input, Icon } from 'antd';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import classNames  from 'classnames';
import './SearchBox.css'


class SearchBox extends Component {
  constructor(props){
    super(props);
    // debounce the passed in dispatch method
    this.onSearch = debounce(this.props.onSearch, this.props.debounce || 100)
  }

  static defaultProps = {
    placeholder: 'Search all...',
    size: 'large',
    prefix: <Icon type="search" />
  };

  handleChange = e => {
    this.onSearch(e.target.value);
  };

  render() {
    const { className, ...others } = this.props;
    delete others.onSearch;
    delete others.keys;
    return  (<Input className={classNames('search-box', className)}
                    onChange={this.handleChange} {...others} />)
  }
}

export default SearchBox;

function searchString(searchText, strings) {
  const reg = new RegExp(searchText, 'gi');
  strings = JSON.stringify(strings);
  return strings && strings.match(reg);
}

export function createFilter(searchText, keys) {
  return (item)=>{
    if(!keys){
      return searchString(searchText, item);
    }
    return keys.some(key => {
      const value = get(item, key);
      return searchString(searchText, value)
    })
  }
}

