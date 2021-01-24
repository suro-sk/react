import {PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

class Task extends PureComponent  {

    render() {
        const {onEdit, task, deleteTask, buttonDisabled, selected} = this.props;
        return (
            <Card>
                <Card.Header>
                    <Form.Group controlId={task._id} className="mb-0">
                        <Form.Check
                            type="checkbox"
                            label={task.title}
                            checked={selected}
                            onChange={() => this.props.inputChange(task._id)}
                        />
                    </Form.Group>
                </Card.Header>
                <Card.Body>
                    {task.description}
                </Card.Body>
                <Card.Footer>
                    <Button
                        className="mr-1"
                        title="Edit"
                        variant="primary"
                        onClick={() => onEdit(task)}
                        disabled={buttonDisabled}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    <Button
                        title="Delete"
                        variant="danger"
                        onClick={() => deleteTask(task._id)}
                        disabled={buttonDisabled}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                </Card.Footer>
            </Card>

        )
    }

}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    inputChange: PropTypes.func.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
}

export default Task;