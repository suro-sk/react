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
                        <Form.Check type="checkbox" label="Mark" onChange={() => this.props.inputchange(this.props.taskId)}/>
                    </Form.Group>
                    <Button variant="danger" className="delete" onClick={() => this.props.deleteTask(this.props.taskId)} disabled={this.props.buttonDisabled}>Delete Task</Button>
                </Card.Body>
            </Card>

        )
    }


}