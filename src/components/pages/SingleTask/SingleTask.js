import React, {PureComponent} from "react";
import TaskEditModal from "../../TaskEditModal";
import {formatDate} from '../../../helpers/functions'
import {Button, ButtonToolbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux';
import {deleteTask, getTask} from "../../store/actions";

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
        const {task} = this.props;
        return (
            task &&
            <div className="single-task text-center">
                <h1>{task.title}</h1>
                <p className="description">{task.description}</p>
                <p className="date">
                    <strong>Date: </strong>
                    <time>{formatDate(task.date)}</time>
                </p>
                <ButtonToolbar className="dflex justify-content-center">
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
                        task={this.props.task}
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
    deleteTask
};

const mapStateToProps = (state) => {
    return {
        task: state.task,
        // taskAdded: state.taskAdded,
        taskEdited: state.taskEdited,
        // tasksDeleted: state.tasksDeleted
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);