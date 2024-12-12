import React from 'react';

import './index.css';

import wallBody from "./wall-body.webp";

import Badge from '~/component/Badge';

class Wall extends React.Component {
  
  render() {
    
    const { player, value, max } = this.props;
    console.log("WALL:", value, max);
    const height = `${(value/max)*100}%`;
    const style = {
      height,
      backgroundImage: `url(${wallBody})`,
    }

    return(
      <div className={`wall wall-${player}`}>
        <div className="wall-inner" style={style}>
        </div>
        <Badge type="wall">{value}</Badge>
        {/* <div className="wall-badge">{value}</div> */}
      </div>
    );
  }
}

export default Wall;