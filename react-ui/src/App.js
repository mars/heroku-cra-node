import React, {Component} from "react";
import socketIOClient from "socket.io-client";


function JdMessagesList(props) {
    //TODO showing not working show=true for now
    let ui;
    let show = true;
    if (show) {
        ui = props.messages.map(message => {
            return (<p>{message.user}: {message.message}</p>)
        })
    } else {
        ui = <p>SHOW</p>
    }

    function change() {
        show = !show;
        console.log(show)
    }

    return (<div onClick={change}>{ui}</div>)

}

function ChannelList(props) {
    let channels = props.channels;
    let render;
    if (channels) {
        render = channels.map(channel => {
            return (
                <div>
                    <h2>{channel.name.toUpperCase()}</h2>
                    <h4>Total messages {channel.total_messages}</h4>
                    <h4>JD messages {channel.jd_messages.length}</h4>
                    <JdMessagesList messages={channel.jd_messages}/>
                </div>)

        })
    } else {
        render = <h2>Loading...</h2>
    }

    return <div>{render}</div>
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "https://jdpisarz.herokuapp.com"
        }
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('from_api', data => this.setState({response: data}));
    }

    render() {
        const response = this.state.response;

        return (
            <div>
                <ChannelList channels={response}/>
            </div>
        )
    }


}

export default App;