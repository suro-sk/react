import React, {PureComponent} from "react";
import TaskEditModal from "../../TaskEditModal";
import {dateToDMY, formatDate} from '../../../helpers/functions'
import {Button, ButtonToolbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit, faCheck, faRedo} from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux';
import {deleteTask, getTask, editTask} from "../../store/actions";
import Card from "react-bootstrap/Card";

class SingleTask extends PureComponent {
    state = {
        task: {},
        isEditModalOpen: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.id
        this.props.getTask(taskId)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.taskEdited && this.props.taskEdited) {
            this.setState({
                isEditModalOpen: false
            });

            return;
        }

        if (prevProps.task && !this.props.task) {
            this.props.history.push('/');
        }
    }

    toggleEditModal = () => {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        })
    }

    handleTaskDelete = () => {
        const taskId = this.props.task._id
        this.props.deleteTask(taskId)
    }


    render() {
        const {task, editTask} = this.props;
        return (
            task &&
            <div className="single-task text-center">
                <h1>{task.title}</h1>
                <p className="description">{task.description}</p>
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
                <ButtonToolbar className="dflex justify-content-center">
                    {
                        task.status === 'active' ?
                            <Button
                                className="mr-1"
                                title="Mark as Done"
                                variant="success"
                                onClick={() => editTask({
                                    status: 'done',
                                    _id: task._id
                                }, true)}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </Button> :
                            <Button
                                className="mr-1"
                                title="Mark as Active"
                                variant="secondary"
                                onClick={() => editTask({
                                    status: 'active',
                                    _id: task._id
                                }, true)}>
                                <FontAwesomeIcon icon={faRedo}/>
                            </Button>
                    }
                    <Button
                        className="mr-1"
                        title="Edit"
                        variant="primary"
                        onClick={this.toggleEditModal}
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    <Button
                        title="Delete"
                        variant="danger"
                        onClick={this.handleTaskDelete}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                </ButtonToolbar>
                {
                    this.state.isEditModalOpen &&
                    <TaskEditModal
                        task={task}
                        isSingle
                        onHide={this.toggleEditModal}
                    />
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    getTask,
    deleteTask,
    editTask
};

const mapStateToProps = (state) => {
    return {
        task: state.task,
        taskEdited: state.taskEdited,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);