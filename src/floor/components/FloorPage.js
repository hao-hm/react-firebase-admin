import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import FloorList from './FloorList'
import selector from '../selector';
import FloorForm from './FloorForm';
import {CREATE_MODE, EDIT_MODE} from '../../util/actionType';


const FloorPage = (props) => {
  const renderContent = () => {
    switch (props.mode){
      case CREATE_MODE:
      case EDIT_MODE:
        return <FloorForm />;
      default:
        return <FloorList/>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  )
};

//prop types
FloorPage.propTypes = {
  mode: PropTypes.string.isRequired
};

//////////////
const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state)
  };
};

export default connect(mapStateToProps)(FloorPage);