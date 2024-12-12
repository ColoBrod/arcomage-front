import React from 'react';
import './index.css';
import './adaptiveness.css'

import Global from '~/Global';
import lc from './locales';

import bgQuarry from './resource-quarry.webp';
import bgMagic from './resource-magic.webp';
import bgDungeon from './resource-dungeon.webp';

const bg = [bgQuarry, bgMagic, bgDungeon];

class Resource extends React.Component {
  static contextType = Global;
  static name = ["Bricks", "Gems", "Recruits"];

  render() {

    const { ln } = this.context;
    lc.setLanguage(ln)
    const { type, amount, income } = this.props;
    const style = { backgroundImage: `url(${bg[type]})` }

    return(
      <div className={`resource resource-${type}`}>
        <div className="resource-inner" style={style}>
          <div className="resource-income">{income}</div>
        </div>
        <div>
          <div className="resource-amount">{amount}</div>
          <div className="resource-type">{lc[type].income}</div>
        </div>
      </div>
    );
  }
}

export default Resource;