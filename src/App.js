import logo from './logo.svg';
import Header from './Header';
import Product from "./Product";
import Footer from './Footer';
import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>
            <section className="shop">
                <h2>Shop</h2>
                <div className="products-holder">
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="banabas" price="$10" description="Fresh bananas from Ecuador"/>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default App;
