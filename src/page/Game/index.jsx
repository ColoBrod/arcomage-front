// Libraries
import React from "react";
import { io } from "socket.io-client";

// ReactContext
import Global from '~/Global';

// Components
import TopPanel from '~/component/TopPanel'
import Resource from '~/component/Resource';
import Tower from '~/component/Tower';
import Wall from '~/component/Wall';
import Card from '~/component/Card';
import Badge from '~/component/Badge';

// Images
import BG from '~/assets/img/bg.webp';

// Styles
import '~/style/normalize.css';
import '~/style/index.css';
import '~/style/adaptiveness.css';
import '~/style/adaptiveness-debug.css';
import '~/style/battlefield.css';

// Scripts
import SoundController from "~/SoundController";
let soundController;

class Game extends React.Component {

  static contextType = Global;

  constructor(props) {
    super(props);

    this.state = {
      ln: "ru",
      pIndex: 0,
      game: {
        condition: {
          tower: 0,
          wall: 0,
          resource: 0,
        },
        player: [
          {
            name: "",
            cards: [],
            tower: 0,
            wall: 0,
            res: [
              { income: 0, amount: 0 },
              { income: 0, amount: 0 },
              { income: 0, amount: 0 },
            ],
            playedCard: -1,
          },
          {
            name: "",
            cards: [],
            tower: 0,
            wall: 0,
            res: [
              { income: 0, amount: 0 },
              { income: 0, amount: 0 },
              { income: 0, amount: 0 },
            ],
            playedCard: -1,
          },
        ],
        lastCard: null,
        lastDiscarded: false,
        cycle: 0,
        turn: -1,
        action: 0,
      }
    }
    this.ref = React.createRef();

    this.ws = io('ws://92.53.91.152:9001', {
      autoConnect: false,
    });
    // io('ws://localhost:9000/game');
    soundController = new SoundController(this.ws);
    // Bindings:
    this.sendAction = this.sendAction.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.handlePlayerIndex = this.handlePlayerIndex.bind(this);
  }

  render() {
    const { ln } = this.context;
    const { pIndex, game } = this.state;
    const eIndex = pIndex == 0 ? 1 : 0;
    const { player, lastCard, lastDiscarded, turn } = game;
    const { name: pName, cards, playedCard } = player[pIndex];
    const { name: eName } = player[eIndex];
    const { res: pRes } = player[pIndex];
    const { ref } = this;

    const sectionStyle = {
      backgroundImage: `url(${BG})`
    };

    return (
      <div id="battlefield" ref={ref.bf}>
        {/* Первый раздел, на котором башенки и экономика */}
        <section id="main" style={sectionStyle}>
          {/* <TopPanel /> */}
          
          <aside className="player-panel">
            <Badge type="player" number="1" highlight={ turn == 0 }>{ pIndex == 0 ? pName : eName }</Badge>
            <div className="resources resources-1">
              {
                player[0].res.map((res, i) => <Resource key={i} type={i} amount={res.amount} income={res.income} />)
              }
            </div>
          </aside>
          <aside className="player-panel">
            <Badge type="player" number="2" highlight={ turn == 1 }>{ pIndex == 1 ? pName : eName }</Badge>
            <div className="resources resources-2">
              {
                player[1].res.map((res, i) => <Resource key={i} type={i} amount={res.amount} income={res.income} />)
              }
            </div>
          </aside>

          <Tower value={player[0].tower} max={game.condition.tower} player={1} />
          <Tower value={player[1].tower} max={game.condition.tower} player={2} />

          <Wall value={player[0].wall} max={game.condition.wall} player={1} />
          <Wall value={player[1].wall} max={game.condition.wall} player={2} />

          <Card type="deck" flipped={true} identifier="" title="" res={{type:0, cost:0}} desc="" />
          
          {
            lastCard && <Card type="recent" discarded={ lastDiscarded ? true : false } identifier={lastCard.slug} title={lastCard.title} res={lastCard.res} desc={lastCard.desc} />
          }

          <div className="current-turn">{ this.getStatus() }</div>
        </section>
        {/* Второй раздел, на котором карты */}
        <section id="cards">
          <div className="cards-container">
            {
              cards.map((card, i) => {
                const pHas = pRes[card.res.id].amount; // Resources, card dim
                console.log(`Name: ${card.title}\ncard.res.id: ${card.res.id}\nPlayer has: ${pHas}\nCard cost: ${card.res.cost}`);
                // title={card.title}
                // desc={card.desc}
                return (
                  <div key={i} className="card-wrapper">
                    <Card 
                      index={i}
                      identifier={card.slug} 
                      res={card.res}
                      pRes={pHas}
                      wasPlayed={playedCard == i && turn == eIndex}
                    />
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    );
  }

  componentDidMount() {
    const { ws } = this;

    ws.connect();
    ws.on("connect", this.handleConnect);
    ws.on("info", this.handleInfo);
    ws.on("player-index", this.handlePlayerIndex);
    ws.on("game-state", this.updateGame);
    ws.on("game-start", this.handleGameStart);
    ws.on("game-over", this.handleGameOver);
    ws.on("disconnect", this.handleDisconnect);

    document.addEventListener("action", this.sendAction);
  }

  componentWillUnmount() {
    const { ws } = this;
    ws.close();
    document.removeEventListener("action", this.sendAction)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevGame = prevState.game;
    const curGame = this.state.game;
    soundController.determine(prevGame, curGame);
  }

  handleInfo(msg) {
    console.info("Server sends:")
    console.info(msg);
  }

  handleConnect() {
    console.log("Подключение к серверу установлено.");
  }

  handlePlayerIndex(pIndex) {
    this.setState({ pIndex });
  }

  handleGameStart(game) {
    console.info("Server sends:");
    console.log(game);
  }

  async handleGameOver(res) {
    await new Promise(resolve => setTimeout(() => resolve(), 5000));
  }

  handleDisconnect() {
    alert("Соединение разорванно");
    location.reload();
  }

  handleMessage(res) {
    const msg = JSON.parse(res.data);
    
    switch (msg.type) {
      case "info": 
        console.log(msg.txt);
        break;
      case "game-start":
        const { pIndex } = msg;
        console.log("Игра начинается. Ваш ИД:", pIndex);
        this.startGame(pIndex);
        break;
      case "game-state": 
        const { game } = msg;
        this.updateGame(game);
        break;
    }
  }

  startGame(pIndex) {
    this.setState({ pIndex });
  }

  updateGame(game) {
    console.log(game);
    this.setState({ game });
  }

  sendAction(event) {
    const { ws } = this;
    const { detail: action } = event;
    console.log(action);
    ws.emit("action", action)
  }

  getStatus() {
    if (this.action == 0 && this.turn == -1) return "Ожидаем игрока";
    else if (this.action > 0 && this.turn == -1) return "Игра окончена";
    else if (this.turn == 0) return "Сейчас ходит игрок 1";
    else if (this.turn == 1) return "Сейчас ходит игрок 2";
  }

}

export default Game;
