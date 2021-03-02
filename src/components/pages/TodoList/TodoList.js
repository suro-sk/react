import {Component} from 'react';
import Task from "../../Task";
import {Button, ButtonToolbar, ButtonGroup, Row, Col} from 'react-bootstrap';
import ConfirmModal from "../../ConfirmModal";
import TaskCreateModal from "../../TaskCreateModal";
import TaskEditModal from "../../TaskEditModal";
import Filters from "../../Filters/Filters";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faCheck, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {getTasks, deleteTasks} from "../../store/actions";

class TodoList extends Component {

    state = {
        selectedTasks: new Set(),
        showDeleteModal: false,
        showTaskCreateModal: false,
        currentEditing: null,
    }

    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.taskAdded && this.props.taskAdded) {
            this.setState({
                showTaskCreateModal: false
            });

            return;
        }

        if (!prevProps.taskEdited && this.props.taskEdited) {
            this.setState({
                currentEditing: null
            });

            return;
        }

        if (!prevProps.tasksDeleted && this.props.tasksDeleted) {
            this.setState({
                selectedTasks: new Set(),
                showDeleteModal: false
            });
            return;
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckboxChange = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        selectedTasks.has(taskId) ? selectedTasks.delete(taskId) : selectedTasks.add(taskId);

        this.setState({
            selectedTasks
        })
    }

    handleSelectAll = () => {
        const allTasksIds = this.props.tasks.map(task => task._id);
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
        const {selectedTasks} = this.state;

        this.props.deleteTasks(selectedTasks)

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

    render() {
        const generatedTasks = this.props.tasks.map((task) => {
            return (
                <div key={task._id} className="col-xl-3 col-lg-4 col-md-6 task">
                    <Task
                        task={task}
                        inputChange={this.handleCheckboxChange}
                        buttonDisabled={!!this.state.selectedTasks.size}
                        selected={this.state.selectedTasks.has(task._id)}
                        onEdit={this.handleEdit}
                    />
                </div>
            )
        })
        const noTasks = <p className="mx-auto">You have not created any task yet.</p>
        const {selectedTasks} = this.state;
        const {tasks} = this.props;
        return (

            <div className="todo-list">
                <Row className="mb-5 justify-content-center">
                    <Col>
                        <Filters/>
                    </Col>
                </Row>
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
                        onHide={() => this.handleEdit(null)}
                    />
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    getTasks,
    deleteTasks
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        taskAdded: state.taskAdded,
        taskEdited: state.taskEdited,
        tasksDeleted: state.tasksDeleted
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);