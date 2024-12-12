import React from 'react';

import { Link, Navigate } from 'react-router-dom';

import './style.css';

// ReactContext
import Global from '~/Global';

class Main extends React.Component {
  static contextType = Global;

  constructor(props, context) {
    super(props);
    const { username } = context;
    this.state = {
      username: username || "Player",
      isSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { username, isSubmit } = this.state;
    const { ln } = this.context;

    if (isSubmit) return(<Navigate to="/lobby" replace={true} />);

    return(
      <div id='main'>
        <h1>Welcome to Main menu</h1>
        <Link to={"/lobby"}>Go back</Link>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Имя игрока:</label>
          <input type="text" value={username} name="username" onChange={this.handleChange}/>
          <input type="submit" value="Играть" />
        </form>

      </div>
    );
  }

  handleChange(event) {
    const { value: username } = event.target;
    this.setState({ username });
  }

  handleSubmit(event) {
    const { username } = this.state;
    const e = new CustomEvent('set-global', { detail: { key: "username", value: username } });
    this.setState({ isSubmit: true });
    document.dispatchEvent(e);
    event.preventDefault();
  }

}

export default Main;