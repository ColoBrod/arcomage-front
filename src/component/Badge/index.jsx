import React from 'react';

import './index.css';
import './adaptiveness.css';

class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.timeoutID = 0;
    this.ref = React.createRef();
  }

  render() {
    const { type, number, highlight } = this.props;
    const text = this.props.children;

    return (
      <div ref={this.ref} className={`badge badge-${number} badge-${type} ${highlight ? 'highlight' : ''}`}>
        <div className="badge-inner">
          { text }
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    const badge = this.ref.current;
    const { highlight } = this.props;
    clearInterval(this.timeoutID)
    if (highlight) {
      badge.classList.add("highlight");
      this.timeoutID = setInterval(() => this.blink(), 1000)
    }
  }

  blink() {
    const badge = this.ref.current;
    badge.classList.toggle("highlight");
  }

}

export default Badge;