import logo from './logo.svg';
import Header from './Header';
import CurrentDay from './CurrentDay';
import Footer from './Footer';
import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
                <CurrentDay/>
                <Footer/>
            </header>
        </div>
    );
}

export default App;
