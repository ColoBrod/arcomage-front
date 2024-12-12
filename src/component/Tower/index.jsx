import React from 'react';

import './index.css';

import towerBody from "./tower-body.webp";
import towerTop1 from "./tower-top-1.webp";
import towerTop2 from "./tower-top-2.webp";

import Badge from "~/component/Badge";

class Tower extends React.Component {
  
  render() {

    const { player, value, max } = this.props;

    const height = `${(value/max)*100}%`
    const style = {
      height,
      backgroundImage: `url(${towerBody})`,
    }
    const styleTop = {
      backgroundImage: `url(${ player == 1 ? towerTop1 : towerTop2 })`
    }

    // , backgroundImage: towerBg
    return(
      <div className={`tower tower-${player}`}>
        <div className="tower-inner" style={style}>
          <div className={`tower-top tower-top-${player}`} style={styleTop}></div>
        </div>
        <Badge type="tower">{value}</Badge>
        {/* <div className="tower-badge">
          <div className="tower-badge-inner">
            {value}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Tower;