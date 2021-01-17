import {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

class Task extends Component {

    render() {
        return (
            <Card>
                <Card.Header>{this.props.task.title}</Card.Header>
                <Card.Body>
                    <Form.Group controlId={this.props.taskId}>
                        <Form.Check type="checkbox" label="Mark"
                                    onChange={() => this.props.inputchange(this.props.taskId)}/>
                    </Form.Group>
                    <Button variant="danger" className="delete" onClick={() => this.props.deleteTask(this.props.taskId)}
                            disabled={this.props.buttonDisabled}>Delete Task</Button>
                </Card.Body>
            </Card>

        )
    }


}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    taskId: PropTypes.string.isRequired,
    deleteTask: PropTypes.func.isRequired,
    inputchange: PropTypes.func.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
}

export default Task;