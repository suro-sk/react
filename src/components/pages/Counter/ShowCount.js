import React from "react";
import {connect} from 'react-redux';

function ShowCount(props) {
    return(
        <h3>
            Count: {props.count}
        </h3>
    )
}

const mapStateToProps  = (state) => {
    return {
        count: state.count
    }
};

export default connect(mapStateToProps)(ShowCount);