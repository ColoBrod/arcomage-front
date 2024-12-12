// Libraries
import React from "react";

// Router
import { 
  createBrowserRouter,
  RouterProvider, 
} from 'react-router-dom';

// Pages
import Game from '~/page/Game';
import Main from '~/page/Main';
import Lobby from '~/page/Lobby';

// ReactContext
import Global from '~/Global';

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/lobby", element: <Lobby /> },
  { path: "/game", element: <Game /> },
]);


class App extends React.Component {
  constructor(props) {
    super(props);

    const ln = localStorage.getItem("ln");
    const username = localStorage.getItem("username");

    // Globals
    this.state = {
      ln: ln || "ru", 
      username: username || "Player"
    }

    this.setGlobal = this.setGlobal.bind(this);
  }

  render() {
    const {ln} = this.state;

    return (
      <Global.Provider value={ this.state }>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </Global.Provider>
    );
  }

  componentDidMount() {
    document.addEventListener('set-global', this.setGlobal);
  }

  componentWillUnmount() {
    document.removeEventListener('set-global', this.setGlobal);
  }

  setGlobal(event) {
    const { key, value } = event.detail;
    localStorage.setItem(key, value);
    this.setState({ [key]: value }, () => console.log(this.state));
  }

}

export default App;