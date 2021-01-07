import {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class Task extends Component {

    render() {
        return (
            <Card>
                <Card.Header>{this.props.task.title}</Card.Header>
                <Card.Body>
                    <Button variant="danger" className="delete" onClick={() => this.props.deleteTask(this.props.taskId)}>Delete Task</Button>
                </Card.Body>
            </Card>

        )
    }


}