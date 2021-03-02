import React from "react";
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import * as actionTypes from '../../store/actionTypes';

function Decrement(props) {
    return (
        <Button onClick={props.onMinusButton}>Decrement Count</Button>
    )
}

const mapDispatchToProps = {

    onMinusButton: function(){
        return (dispatch) => {
            dispatch({type: actionTypes.DECREMENT_COUNT});
        }
    }
};

export default connect(null, mapDispatchToProps)(Decrement);