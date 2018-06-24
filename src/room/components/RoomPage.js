import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import RoomList from './RoomList'
import selector from '../selector';
import RoomForm from './RoomForm';
import {CREATE_MODE, EDIT_MODE} from '../../util/actionType';


const RoomPage = (props) => {
  const renderContent = () => {
    switch (props.mode){
      case CREATE_MODE:
      case EDIT_MODE:
        return <RoomForm />;
      default:
        return <RoomList/>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  )
};

//prop types
RoomPage.propTypes = {
  mode: PropTypes.string.isRequired
};

//////////////
const mapStateToProps = (state) => {
  return {
    mode: selector.getCurrentMode(state)
  };
};

export default connect(mapStateToProps)(RoomPage);