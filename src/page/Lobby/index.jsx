import React from 'react';
import { io } from "socket.io-client";

import { Link } from 'react-router-dom';

import './index.css';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };

    this.ws = io('ws://89.179.241.43:9000/lobby', {
      autoConnect: false,
    });
  }

  render() {
    return(
      <div id='lobby'>
        <Link to={"/"}>Главное меню</Link>
      </div>
    );
  }

  componentDidMount() {
    const { ws } = this;
    ws.connect();
    ws.on('update', () => this.updateList())
  }

  componentWillUnmount() {
    const { ws } = this;
    ws.close();
  }

  updateList() {
    console.log("%cupdating...", 'color: red;, font-size: 40px;')
  }

}

export default Lobby;