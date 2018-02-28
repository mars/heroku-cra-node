import React, { Component } from 'react';
import '../css/BearTest.css';

export default class BearsTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bears: [],
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api/bears')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          bears: json,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="BearTest">
        {this.state.bears.length > 0 ?
          this.state.bears.map((bear) => <p>{bear.name}</p>) :
          (<h2>no bears</h2>)
        }
      </div>
    );
  }
}
