import {Component} from 'react';
import trashIcon from '../assets/trash.svg';

export default class Task extends Component {

    render() {
        return (
            <>
                <span>{this.props.name}</span>
                <div className="actions">
                    <span className="delete" onClick={() => this.props.deleteTask(this.props.taskId)} title="Delete Task">
                        <img src={trashIcon} alt=""/>
                    </span>
                </div>
            </>

        )
    }


}