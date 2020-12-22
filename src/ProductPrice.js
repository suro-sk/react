import {Component} from 'react';

class ProductPrice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            price: props.price,
            currency: 'USD',
            currencySign: '$'
        }
    }

    handleCurrencySwith = () => {
        const rate = 500;
        this.setState({
            price: this.state.currency === 'USD' ? this.state.price * rate : this.state.price / rate,
            currency: this.state.currency === 'USD' ? 'AMD' : 'USD',
            currencySign: this.state.currency === 'USD' ? '֏' : '$',
        })
    }

    render() {
        const anotherCurrency = this.state.currency === 'USD' ? 'AMD' : 'USD';
        return (
            <>
                <p>{this.state.currencySign + this.state.price}</p>
                <button onClick={this.handleCurrencySwith}>Change the currency to {anotherCurrency}</button>
            </>
        )
    }
}

export default ProductPrice;