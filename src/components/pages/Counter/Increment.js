import React from "react";
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

function Increment(props) {
    return (
        <Button onClick={props.onPlusButton}>Increment Count</Button>
    )
}

const mapDispatchToProps = {
    onPlusButton: () => {
        return (dispatch) => {
            dispatch({type: 'INCREMENT_COUNT'});
        }
    }
};

export default connect(null, mapDispatchToProps)(Increment);