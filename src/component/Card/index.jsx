import React, { createRef } from 'react';

import Global from '~/Global';

import './index.css';
import './adaptiveness.css';

import CardBack from './back.webp';

import EN from './locales/en';
import RU from './locales/ru';

// import './spritesheet-xl.css';
// import './spritesheet-lg.css';
// import './spritesheet-md.css';
// import './spritesheet-sm.css';
// import './spritesheet-xs.css';

// import sfxDamage from '~/assets/sfx/damage.mp3';
// import sfx from '../../sfx';

class Card extends React.Component {

  static contextType = Global;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    // this.touchStart = 0;
    // this.touchEnd = 0;
    
    this.handleClick = this.handleClick.bind(this);
    this.play = this.play.bind(this);
    this.discard = this.discard.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    // TODO - remove these handlers
    // this.handleTouchStart = this.handleTouchStart.bind(this);
    // this.handleTouchMove = this.handleTouchMove.bind(this);
    // this.handleTouchEnd = this.handleTouchEnd.bind(this);

    // Drag-and-Drop implementation
    this.dnd = {
      main: document.querySelector("section#main"),
      initialX: 0,
      initialY: 0,
      width: 0,
      height: 0,
    }
  }

  render() {
    const { ln } = this.context;
    const lc = { ru: RU, en: EN }
    const { type, discarded, flipped, identifier: id, res, pRes } = this.props;
    const card = lc[ln].find(card => card.slug == id);
    const { title, desc } = card ? card : { title: "", desc: "" };
    // const { title, desc } = lc[ln].find(card => card.slug == id);
    const style = {
      backgroundImage: `url("${CardBack}")`,
    }
    const unplayable = (pRes < res.cost) ? true : false;
    const recent = type == "recent" ? true : false;
    if (type == "deck") {
      return(
        <div className="deck card flipped">
          <div className="card-back" style={style}></div>
        </div>
      )
    }

    return(
        // onClick={this.handleClick} 
        // onContextMenu={this.handleClick}
        // onTouchStart={this.handleTouchStart}
        //   onTouchMove={this.handleTouchMove}
        //   onTouchEnd={this.handleTouchEnd}
        <div 
          onClick={this.handleClick} 
          onContextMenu={this.handleClick}
          onTouchStart={this.handleDragStart}
          onTouchMove={this.handleDragMove}
          onTouchEnd={this.handleDrop}
          onTouchCancel={this.handleDrop}
          ref={this.ref}
          className={`card card-${res.id} ${discarded ? "discarded" : ""} ${unplayable ? "unplayable" : ""} ${recent ? "recent" : ""}`}
        >
          <div className="card-front">
            <div className="card-title">{title}</div>
            <div className="card-img-wrapper">
              <div 
                className={`card-img card-img-${id}`}
                draggable="false"
              ></div>
              {/* style={{ backgroundImage: `url(/img/card/${id}.jpg)` }}  */}
              {/* <img src={`./cards-sm/${id}.jpg`} alt="" /> */}
            </div>
            <div className="card-desc">
              <div className="card-desc-inner">
                {desc}
              </div>
            </div>
            <div className="card-cost">{res.cost}</div>
          </div>
          <div className="card-back" style={style}></div>
        </div>
    );
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
  }

  async componentDidUpdate() {
    // const { current: card } = this.ref;
    // const { wasPlayed } = this.props;
    // if (wasPlayed) this.animate(card);
  }

  

  handleClick(e) {
    e.preventDefault();
    const btn = e.nativeEvent.button;
    const { type } = this.props;
    if (type == "recent" || type == "deck") return;
    if (btn === 0) {
      this.play();
      // event = new CustomEvent("action", { detail: { action: "play", index } });
    }
    else if (btn === 2) {
      this.discard();
      // event = new CustomEvent("action", { detail: { action: "discard", index } });
    }
    // this.handleAnimate(e.currentTarget);
  }

  /**
   * Здесь описываются функции, отвечающие за Drag-and-Drop
   */
  handleDragStart(event) {
    const { current: card } = this.ref;
    const fingers = event.targetTouches.length;
    const cardPos = card.getBoundingClientRect();
    const { dnd } = this;
    const touchPos = { 
      x: event.targetTouches[0].clientX,
      y: event.targetTouches[0].clientY,
    };
    dnd.initialX = touchPos.x;
    dnd.initialY = touchPos.y;
    dnd.width = card.clientWidth;
    dnd.height = card.clientHeight;
    card.classList.add("drag");
  }

  handleDragMove(event) {
    const { current: card } = this.ref;
    const { dnd } = this;
    const { clientX: cardX, clientY: cardY } = event.targetTouches[0];
    const { main } = this.dnd;
    card.style.left = (cardX - dnd.initialX) + "px";
    card.style.top = (cardY - dnd.initialY) + "px";
    
    // Notifies player that he can now play a card
    if ((dnd.initialY - cardY) > (dnd.height / 2)) 
      main.classList.add('highlight');
    else 
      main.classList.remove('highlight');
  }

  handleDrop(event) {
    const { current: card } = this.ref;
    const { clientX: finalX, clientY: finalY } = event.changedTouches[0];
    const { main, height, initialX, initialY } = this.dnd;
    card.style.left = 0;
    card.style.top = 0;
    if ((initialY - finalY) > (height / 2)) this.play();
    else if ((initialY - finalY) < - (height / 2)) this.discard();
    main.classList.remove('highlight');
    card.classList.remove("drag");
  }

  play() {
    const { index } = this.props;
    const event = new CustomEvent("action", { detail: { action: "play", index } });
    document.dispatchEvent(event);
  }

  discard() {
    const { index } = this.props;
    const event = new CustomEvent("action", { detail: { action: "discard", index } });
    document.dispatchEvent(event);
  }

  /*
  handleTouchStart(e) {
    console.log(e);
    this.touchStart = e.targetTouches[0].clientX;
    // this.touchStart = e.nativeEvent.timeStamp;
  }
  
  handleTouchMove(e) {
    this.touchEnd = e.targetTouches[0].clientX;
    // this.touchEnd = e.nativeEvent.timeStamp;
  }

  handleTouchEnd(e) {
    let event;
    e.preventDefault();
    const { type, index } = this.props;
    const res = this.touchStart - this.touchEnd;
    console.log(res);
    if (type == "recent" || type == "deck") return;
    if (res > 75) {
      // Discard
      console.log("Play");
      event = new CustomEvent("action", { detail: { action: "play", index } });
    }
    else if (res < -75) {
      console.log("Discard");
      event = new CustomEvent("action", { detail: { action: "discard", index } });
    }
    if (event) document.dispatchEvent(event);
  }
  */

  async animate(element) {
    const bf = document.querySelector("#battlefield");
    const original = element;
    const clone = original.cloneNode(true);
    const coord = Card.#getCoord(original, bf);
    const recent = document.querySelector(".card.recent");
    
    clone.style.top = coord.top + "px";
    clone.style.left = coord.left + "px";
    clone.classList.add("animation-clone");
    if (recent) recent.classList.add("to-deck");
    original.classList.add("invisible");
    bf.appendChild(clone);
    await sleep(500);
    original.classList.remove("invisible");
    clone.remove();
    if (recent) recent.classList.remove("to-deck");
  }

  static #getCoord(card, bf) {
    const cardRect = card.getBoundingClientRect();
    const bfRect = bf.getBoundingClientRect();

    const initial = {
      top: cardRect.top - bfRect.top,
      left: cardRect.left - bfRect.left,
    }

    return initial;
  }

  get unplayable() {
    const { res, pRes } = this.props;
    return (pRes < res.cost) ? true : false;
  }

}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

export default Card;