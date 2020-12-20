import {Component} from 'react';

class ProductDescription extends Component {

    render() {
        return(
            <p>{this.props.description}</p>
        )
    }

}

export default ProductDescription;