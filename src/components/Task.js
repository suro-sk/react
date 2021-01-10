import {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class Task extends Component {

    render() {
        return (
            <Card>
                <Card.Header>{this.props.task.title}</Card.Header>
                <Card.Body>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Mark" />
                    </Form.Group>
                    <Button variant="danger" className="delete" onClick={() => this.props.deleteTask(this.props.taskId)}>Delete Task</Button>
                </Card.Body>
            </Card>

        )
    }


}