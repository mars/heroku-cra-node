import React, {Component} from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "https://react-node-test-.herokuapp.com"
        }
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('from_api', data => this.setState({response: data}));
    }

    render() {

        const response = JSON.stringify(this.state.response);
        return (
            <div>
                <p>
                    {response}
                </p>
            </div>
        )
    }
}
export default App;