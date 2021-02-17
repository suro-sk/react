import React from "react";
import Increment from './Increment';
import Decrement from './Decrement';
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';


export default function SetCount(props) {
    return (
        <ButtonToolbar className="justify-content-center">
            <ButtonGroup>
                <Decrement/>
                <Increment/>
            </ButtonGroup>
        </ButtonToolbar>
    )
}