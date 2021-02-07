import React, {PureComponent} from "react";
import TaskEditModal from "../../TaskEditModal";
import {formatDate} from '../../../helpers/functions'
import {Button, ButtonToolbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

export default class SingleTask extends PureComponent {
    state = {
        task: {},
        isEditModalOpen: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.id
        fetch(`http://localhost:3001/task/${taskId}`)
            .then(async (res) => {
                if (res.status >= 400 && res.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong')
                    }
                }
                const task = await res.json()

                this.setState({
                    task
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    toggleEditModal = () => {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        })
    }

    handleTaskSave = (task) => {

        fetch(`http://localhost:3001/task/${task._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                date: formatDate(task.date.toISOString())
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(async (res) => {
                if (res.status >= 400 && res.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong')
                    }
                }
                const task = await res.json()

                this.setState({
                    task,
                    isEditModalOpen: false
                });
            })
            .catch((e) => {
                console.log(e);
            });

    };

    handleTaskDelete = () => {
        const taskId = this.state.task._id
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((res) => {
                if (res.status >= 400 && res.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong')
                    }
                }

                this.props.history.push('/');
            })
            .catch((e) => {
                console.log(e);
            });


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