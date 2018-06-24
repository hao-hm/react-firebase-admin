import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import CustomerList from './CustomerList'
import selector from '../selector';
import CustomerForm from './CustomerForm';
import {CREATE_MODE, EDIT_MODE} from '../../util/actionType';


const CustomerPage = (props) => {
  const renderContent = () => {
    switch (props.mode){
      case CREATE_MODE:
      case EDIT_MODE:
        return <CustomerForm />;
      default:
        return <CustomerList/>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  )
};

//prop types
CustomerPage.propTypes = {
  mode: PropTypes.string.isRequired
};

//////////////
const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state)
  };
};

export default connect(mapStateToProps)(CustomerPage);