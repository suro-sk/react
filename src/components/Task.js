import {PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import {formatDate} from '../helpers/functions';

class Task extends PureComponent  {

    render() {
        const {onEdit, task, deleteTask, buttonDisabled, selected} = this.props;
        return (
            <Card>
                <Card.Header>
                    <Form.Group controlId={task._id} className="mb-0">
                        <Form.Check
                            type="checkbox"

                            checked={selected}
                            onChange={() => this.props.inputChange(task._id)}
                        />
                    </Form.Group>
                    <Card.Title>
                        {task.title}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <p>
                        <strong>Date: </strong>
                        <time>{formatDate(task.date) || "Not Available"}</time>
                    </p>
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