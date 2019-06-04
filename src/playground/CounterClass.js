import React from "react";

class CounterClass extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        });
    };

    render() {
        return (
            <div>
                <div>Class Count: {this.state.count}</div>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

export default CounterClass;
