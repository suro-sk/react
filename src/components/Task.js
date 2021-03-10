import React, {PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit, faCheck, faRedo} from "@fortawesome/free-solid-svg-icons";
import {formatDate, truncateString, dateToDMY} from '../helpers/functions';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {deleteTask, editTask} from "./store/actions";

class Task extends PureComponent  {

    render() {
        const {onEdit, task, buttonDisabled, selected, editTask} = this.props;
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
                        <Link
                            className="text-dark"
                            to={`/task/${task._id}`}
                        >{task.title}</Link>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <p>
                        <strong>Status: </strong>
                        <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                    </p>
                    <p>
                        <strong>Create at: </strong>
                        <time>{dateToDMY(task.created_at) || "Not Available"}</time>
                    </p>
                    <p>
                        <strong>Deadline: </strong>
                        <time>{dateToDMY(task.date) || "Not Available"}</time>
                    </p>
                    {truncateString(task.description, 74)}
                </Card.Body>
                <Card.Footer>
                    {
                        task.status === 'active' ?
                            <Button
                                className="mr-1"
                                title="Mark as Done"
                                variant="success"
                                onClick={() => editTask({
                                    status: 'done',
                                    _id: task._id
                                })}
                                disabled={buttonDisabled}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </Button> :
                            <Button
                                className="mr-1"
                                title="Mark as Active"
                                variant="secondary"
                                onClick={() => editTask({
                                    status: 'active',
                                    _id: task._id
                                })}
                                disabled={buttonDisabled}>
                                <FontAwesomeIcon icon={faRedo}/>
                            </Button>
                    }
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
                        onClick={() => this.props.deleteTask(task._id)}
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
    inputChange: PropTypes.func.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
}


const mapDispatchToProps = {
    deleteTask,
    editTask
};

export default connect(null, mapDispatchToProps)(Task);