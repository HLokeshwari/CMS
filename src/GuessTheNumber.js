import React, { Component } from 'react';
import './Game1.css';

class GuessTheNumber extends Component {
  constructor() {
    super();
    this.state = {
      secretNumber: this.generateRandomNumber(),
      guess: '',
      message: '',
      attempts: 0,
      showResultCard: false,
      showTryAgainCard: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  handleChange(event) {
    this.setState({ guess: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { secretNumber, guess, attempts } = this.state;

    if (guess === '') {
      this.setState({ message: 'Please enter a number.' });
      return;
    }

    const userGuess = parseInt(guess, 10);
    if (isNaN(userGuess)) {
      this.setState({ message: 'Invalid input. Please enter a number.' });
      return;
    }

    this.setState({ attempts: attempts + 1 });

    if (userGuess === secretNumber) {
      this.setState({
        message: `Congratulations! You guessed the number in ${attempts + 1} attempts.`,
        showResultCard: true,
      });
    } else if (attempts >= 5) {
      this.setState({
        message: `Sorry! You couldn't guess the number in six attempts.`,
        showTryAgainCard: true,
      });
    } else if (userGuess < secretNumber) {
      this.setState({ message: 'Too low. Try again.', showResultCard: false });
    } else {
      this.setState({ message: 'Too high. Try again.', showResultCard: false });
    }
  }

  handleReplay() {
    this.setState({
      secretNumber: this.generateRandomNumber(),
      guess: '',
      message: '',
      attempts: 0,
      showResultCard: false,
      showTryAgainCard: false,
    });
  }

  renderResultCard() {
    const { secretNumber, attempts } = this.state;
    return (
      <div className="card correct-result-card">
        <div className="front">
          <h2>Hurray, You Won!</h2>
          <p><span>Correct Number: {secretNumber}</span></p>
        </div>
        <div className="back">
          <p><span>Attempts: {attempts}</span></p>
          <button1 className="button1" onClick={this.handleReplay}>Replay</button1>
        </div>
      </div>
    );
  }

  renderTryAgainCard() {
    const { secretNumber } = this.state;
    return (
      <div className="card try-again-card">
        <div className="front">
          <h2>Sorry, You Lost!</h2>
        </div>
        <div className="back">
          <p><span>Try again next time!</span></p>
          <p><span>Correct Number: {secretNumber}</span></p>
          <button1 className="button1" onClick={this.handleReplay}>Replay</button1>

        </div>
      </div>
    );
  }

  render() {
    const { message, guess, showResultCard, showTryAgainCard } = this.state;

    return (
      <div className='full-height'>
    <div className='content2' style={{ textAlign: 'center' }}>
      <div className="guess-the-number">
        <h1>Guess the Number</h1>
        <p>{message}</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={guess}
            onChange={this.handleChange}
            placeholder="Enter your guess"
          />
          <button type="submit">Submit</button>
        </form>
        <div className="card-container">
          {showResultCard && this.renderResultCard()}
          {showTryAgainCard && this.renderTryAgainCard()}
          </div>
        </div>
    </div>
        
      </div>
    );
  }
}

export default GuessTheNumber;
