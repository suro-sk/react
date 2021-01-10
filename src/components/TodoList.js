import {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Task from "./Task";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'


export default class TodoList extends Component {

    state = {
        inputValue: '',
        tasks: []
    }

    handleInputChange = e => {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleTaskCreating = (e) => {
        e.preventDefault();
        let upcomingTaskTitle = this.state.inputValue.trim();
        if (!upcomingTaskTitle) return;
        let upcomingTask = {
            title: upcomingTaskTitle,
            _id: uuidv4()
        };

        this.setState({
            tasks: [...this.state.tasks, upcomingTask],
            inputValue: ''
        })
    }

    deleteTask = (taskId) => {
        const remainingTasks = this.state.tasks.filter((task) => {
            return taskId !== task._id
        });

        this.setState({
            tasks: remainingTasks
        })
    }

    render() {
        const generatedTasks = this.state.tasks.map((task) => {
            return (
                <div key={task._id} className="col-xl-3 col-lg-4 col-md-6 task">
                    <Task task={task} taskId={task._id} deleteTask={this.deleteTask}/>
                </div>
            )
        })
         const noTasks = <p className="mx-auto">You have not created any task yet.</p>

        return (

            <div className="todo-list">

                <Form className="controls-area" onSubmit={this.handleTaskCreating}>

                    <InputGroup className="mb-5">
                        <FormControl
                            placeholder="Add Your Task"
                            aria-label="Add Your Task"
                            aria-describedby="basic-addon2"
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                        />
                        <InputGroup.Append>
                            <Button type="submit" variant="outline-secondary">Add Task</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <div
                    className="tasks-area row">{generatedTasks.length ? generatedTasks : noTasks}</div>
            </div>
        )
    }
}