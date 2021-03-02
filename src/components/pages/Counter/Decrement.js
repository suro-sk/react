import React from "react";
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

function Decrement(props) {
    return (
        <Button onClick={props.onMinusButton}>Decrement Count</Button>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMinusButton: () => {
            dispatch({ type: 'DECREMENT_COUNT' });
        }
    };
};

export default connect(null, mapDispatchToProps)(Decrement);