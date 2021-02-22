import React, {PureComponent} from "react";
import TaskEditModal from "../../TaskEditModal";
import {formatDate} from '../../../helpers/functions'
import {Button, ButtonToolbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import makeRequest from "../../../helpers/makeRequest";


export default class SingleTask extends PureComponent {
    state = {
        task: {},
        isEditModalOpen: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.id
        makeRequest(`http://localhost:3001/task/${taskId}`)
            .then((task) => {
                this.setState({
                    task
                })
            })
    }

    toggleEditModal = () => {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        })
    }

    handleTaskSave = (task) => {
        makeRequest(`http://localhost:3001/task/${task._id}`, 'PUT', {
            title: task.title,
            description: task.description,
            date: formatDate(task.date.toISOString())
        })
            .then((task) => {
                console.log('task', task)
                this.setState({
                    task,
                    isEditModalOpen: false
                });
            })


    };

    handleTaskDelete = () => {
        const taskId = this.state.task._id
        makeRequest(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then((task)=>{
                this.props.history.push('/');
            })
    }


    render() {
        const {task} = this.state;
        return (
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
                        task={this.state.task}
                        onAccept={this.handleTaskSave}
                        onHide={this.toggleEditModal}
                    />
                }
            </div>

        )
    }
}