import {Component} from 'react';
import Task from "./Task";


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
        let upcomingTask = this.state.inputValue.trim();

        if (!upcomingTask) return;

        this.setState({
            tasks: [...this.state.tasks, upcomingTask],
            inputValue: ''
        })
    }

    deleteTask = (taskId) => {
        const remainingTasks = this.state.tasks.filter((task, idx) => {
            return taskId !== idx
        });

        this.setState({
            tasks: remainingTasks
        })
    }

    render() {
        const generatedTasks = this.state.tasks.map((el, i) => {
            return (
                <li key={i}>
                    <Task name={el} taskId={i} deleteTask={this.deleteTask}/>
                </li>
            )
        })

        return (
            <div className="todo-list">
                <form className="controls-area" onSubmit={this.handleTaskCreating}>
                    <input type="text" value={this.state.inputValue} onChange={this.handleInputChange}
                           placeholder="Add Your Task"/>
                    <button>Add</button>
                </form>
                <ol className="tasks-area">{generatedTasks.length ? generatedTasks : 'You hav not created any task yet.'}</ol>
            </div>
        )
    }
}