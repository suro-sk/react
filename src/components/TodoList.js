import {PureComponent} from 'react';
import Task from "./Task";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import ConfirmModal from "./ConfirmModal";
import TaskCreateModal from "./TaskCreateModal";
import TaskEditModal from "./TaskEditModal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faCheck, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from "../helpers/functions";

export default class TodoList extends PureComponent {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        showDeleteModal: false,
        showTaskCreateModal: false,
        currentEditing: null,
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleTaskCreating = (upcomingTask) => {
        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(upcomingTask),
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
                    tasks: [...this.state.tasks, task],
                    showTaskCreateModal: false,
                })
            })
            .catch((e) => {
                console.log(e);
            });


    }

    deleteTask = (taskId) => {
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

                const remainingTasks = this.state.tasks.filter((task) => {
                    return taskId !== task._id
                });

                this.setState({
                    tasks: remainingTasks
                })
            })
            .catch((e) => {
                console.log(e);
            });


    }

    handleCheckboxChange = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        selectedTasks.has(taskId) ? selectedTasks.delete(taskId) : selectedTasks.add(taskId);

        this.setState({
            selectedTasks
        })
    }

    handleSelectAll = () => {
        const allTasksIds = this.state.tasks.map(task => task._id);
        this.setState({
            selectedTasks: new Set(allTasksIds)
        })
    }

    handleUnselectAll = () => {
        this.setState({
            selectedTasks: new Set()
        })
    }

    handleBulkDelete = () => {
        const {selectedTasks, tasks} = this.state;

        fetch('http://localhost:3001/task', {
            method: 'PATCH',
            body: JSON.stringify({
                tasks: [...selectedTasks]
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

                const remainingTasks = tasks.filter(task => {
                    return !selectedTasks.has(task._id);
                })

                this.setState({
                    tasks: remainingTasks,
                    selectedTasks: new Set(),
                    showDeleteModal: false,
                });

            })
            .catch((e) => {
                console.log(e);
            });

    }

    handleEdit = (task) => {
        this.setState({
            currentEditing: task
        });
    };

    handleDeleteModalToggle = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    handleTaskCreateModalToggle = () => {
        this.setState({
            showTaskCreateModal: !this.state.showTaskCreateModal
        });
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

                const tasks = [...this.state.tasks];
                const idx = tasks.findIndex((thisTask) => thisTask._id === task._id);
                tasks[idx] = task;

                this.setState({
                    tasks,
                    currentEditing: null
                });
            })
            .catch((e) => {
                console.log(e);
            });

    };

    componentDidMount() {
        fetch('http://localhost:3001/task', {
            method: 'GET',
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

                const tasks = await res.json()
                this.setState({
                    tasks
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const generatedTasks = this.state.tasks.map((task) => {
            return (
                <div key={task._id} className="col-xl-3 col-lg-4 col-md-6 task">
                    <Task
                        task={task}
                        deleteTask={this.deleteTask}
                        inputChange={this.handleCheckboxChange}
                        buttonDisabled={!!this.state.selectedTasks.size}
                        selected={this.state.selectedTasks.has(task._id)}
                        onEdit={this.handleEdit}
                    />
                </div>
            )
        })
        const noTasks = <p className="mx-auto">You have not created any task yet.</p>
        const {selectedTasks, tasks} = this.state;
        return (

            <div className="todo-list">

                <div className="row justify-content-center mb-5">
                    <ButtonToolbar>
                        <ButtonGroup aria-label="First group">
                            <Button
                                variant="success"
                                className="mr-2"
                                onClick={this.handleTaskCreateModalToggle}>
                                <FontAwesomeIcon className="mr-1" icon={faPlus}/>
                                Add Task
                            </Button>
                            <Button
                                variant="primary"
                                className="mr-2"
                                onClick={this.handleSelectAll}
                                disabled={!tasks.length}>
                                <FontAwesomeIcon className="mr-1" icon={faCheck}/>
                                Mark All
                            </Button>
                            <Button
                                variant="primary"
                                className="mr-2"
                                onClick={this.handleUnselectAll}
                                disabled={!tasks.length}>
                                <FontAwesomeIcon className="mr-1" icon={faTimes}/>
                                Unmark All
                            </Button>
                            <Button
                                variant="danger"
                                onClick={this.handleDeleteModalToggle}
                                disabled={!selectedTasks.size}>
                                <FontAwesomeIcon className="mr-1" icon={faTrash}/>
                                Delete Selected
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div
                    className="tasks-area row">{generatedTasks.length ? generatedTasks : noTasks}</div>
                {
                    this.state.showDeleteModal &&
                    <ConfirmModal
                        tasksCount={this.state.selectedTasks.size}
                        onAccept={this.handleBulkDelete}
                        onHide={this.handleDeleteModalToggle}
                    />

                }
                {
                    this.state.showTaskCreateModal &&
                    <TaskCreateModal
                        onAccept={this.handleTaskCreating}
                        onHide={this.handleTaskCreateModalToggle}
                        onInputChange={this.handleInputChange}
                    />
                }
                {
                    this.state.currentEditing &&
                    <TaskEditModal
                        task={this.state.currentEditing}
                        onAccept={this.handleTaskSave}
                        onHide={() => this.handleEdit(null)}
                    />
                }
            </div>
        )
    }
}