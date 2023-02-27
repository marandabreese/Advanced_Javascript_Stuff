import React from 'react';

class Car extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: "Ford",
            model: "Mustang",
            color: "red",
            year: 1964
        };
    }

    changeColor = () => {
        this.setState({color: "green"});
    }
    render() {
        return (
            <div>
                <h1>My {this.state.brand}!</h1>
                <p>Right now my car is {this.state.color}</p>
                <button type='button' onClick={this.changeColor}>Change?</button>
            </div>
        )
    }
}

export default Car;