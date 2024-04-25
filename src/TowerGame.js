import React, { Component } from 'react';
import './Tower.css';

class Tower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Define initial state if needed
    };
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    // Implement reset logic here
    // For example, you can reset the state or reload the page
    window.location.reload(); // This reloads the page, resetting everything
  }

  render() {
    return (
      <div>
        <h4>Tower of Hanoi</h4>
        <div className='towform'>
          <div className="discs">
            <input className="tinput" id="one" type="text" tabIndex="-1" readOnly />
            <input className="tinput" name="one" type="radio" tabIndex="-1" defaultChecked />
            <input className="tinput" name="one" type="radio" tabIndex="-1" />
            <input className="tinput" name="one" type="radio" tabIndex="-1" />
            <label className="tlabel" htmlFor="one"></label>
            <div className="disc one"></div>

            <input className="tinput" id="two" type="text" tabIndex="-1" readOnly />
            <input className="tinput" name="two" type="radio" tabIndex="-1" defaultChecked />
            <input className="tinput" name="two" type="radio" tabIndex="-1" />
            <input className="tinput" name="two" type="radio" tabIndex="-1" />
            <label className="tlabel" htmlFor="two"></label>
            <div className="disc two"></div>

            <input className="tinput" id="three" type="text" tabIndex="-1" readOnly />
            <input className="tinput" name="three" type="radio" tabIndex="-1" defaultChecked />
            <input className="tinput" name="three" type="radio" tabIndex="-1" />
            <input className="tinput" name="three" type="radio" tabIndex="-1" />
            <label className="tlabel" htmlFor="three"></label>
            <div className="disc three"></div>

            <input className="tinput" id="four" type="text" tabIndex="-1" readOnly />
            <input className="tinput" name="four" type="radio" tabIndex="-1" defaultChecked />
            <input className="tinput" name="four" type="radio" tabIndex="-1" />
            <input className="tinput" name="four" type="radio" tabIndex="-1" />
            <label className="tlabel" htmlFor="four"></label>
            <div className="disc four"></div>

            <input className="tinput" id="five" type="text" tabIndex="-1" readOnly />
            <input className="tinput" name="five" type="radio" tabIndex="-1" defaultChecked />
            <input className="tinput" name="five" type="radio" tabIndex="-1" />
            <input className="tinput" name="five" type="radio" tabIndex="-1" />
            <label className="tlabel" htmlFor="five"></label>
            <div className="disc five"></div>

            <input className="tinput" id="six" type="text" tabIndex="-1" readOnly />
            <input className="tinput" name="six" type="radio" tabIndex="-1" defaultChecked />
            <input className="tinput" name="six" type="radio" tabIndex="-1" />
            <input className="tinput" name="six" type="radio" tabIndex="-1" />
            <label className="tlabel" htmlFor="six"></label>
            <div className="disc six"></div>

            <input className="tinput" id="zero" type="text" tabIndex="-1" readOnly />

            <div className="spacer a"></div>
            <div className="separator ab"></div>
            <div className="spacer b"></div>
            <div className="separator bc"></div>
            <div className="spacer c"></div>

            <div className="tower a"></div>
            <div className="tower b"></div>
            <div className="tower c"></div>

            <div className="win">You win! :)</div>
          </div>
          <div className="tbottom"></div>
          <br></br>
          <br></br>
          <button className="button5" type="button" onClick={this.handleNewGame}>New Game</button>
        </div>
      </div>
    );
  }
}

export default Tower;
