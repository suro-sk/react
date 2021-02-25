import React from "react";
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import * as actionTypes from '../../store/actionTypes';

function Increment(props) {
    return (
        <Button onClick={props.onPlusButton}>Increment Count</Button>
    )
}

const mapDispatchToProps = {
    onPlusButton: () => {
        return (dispatch) => {
            dispatch({type: actionTypes.INCREMENT_COUNT});
        }
    }
};

export default connect(null, mapDispatchToProps)(Increment);