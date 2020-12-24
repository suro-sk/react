import {Component} from 'react';

export default class Task extends Component {

    render() {
        return (
            <span>{this.props.name}</span>
        )
    }


}