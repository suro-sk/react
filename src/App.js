import TodoList from "./components/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Navbar from "react-bootstrap/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" className="mb-5 justify-content-center">
                <Navbar.Brand>ToDo List</Navbar.Brand>
            </Navbar>
            <div className="container">
                <TodoList/>
            </div>
        </div>
    );
}

export default App;
