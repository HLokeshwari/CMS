import React, { Component } from 'react';
import './game.css';

class SnakeGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board_border: 'black',
      board_background: 'white',
      snake_col: 'orange',
      snake_border: 'red',
      snake: [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 },
      ],
      score: 0,
      changing_direction: false,
      food_x: 0,
      food_y: 0,
      dx: 10,
      dy: 0,
      paused: false,
      countdown: 3, // Countdown before starting the game
    };

    this.snakeCanvasRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.changeDirection);
    this.startCountdown();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.changeDirection);
  }

  startCountdown = () => {
    const countdownInterval = setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }), () => {
        if (this.state.countdown === 0) {
          clearInterval(countdownInterval);
          this.main();
          this.spawnFood();
        }
      });
    }, 1000);
  };

  main = () => {
    if (this.hasGameEnded() || this.state.paused) return;

    this.setState(
      (prevState) => ({
        changing_direction: false,
      }),
      () => {
        setTimeout(() => {
          this.emptyBoard();
          this.makeFood();
          this.moveSnake();
          this.makeSnake();
          this.main();
        }, 100);
      }
    );
  };

  emptyBoard = () => {
    const snakeCanvas = this.snakeCanvasRef.current;
    const snakeCanvasCtx = snakeCanvas.getContext('2d');
    snakeCanvasCtx.fillStyle = this.state.board_background;
    snakeCanvasCtx.strokeStyle = this.state.board_border;
    snakeCanvasCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    snakeCanvasCtx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  };

  makeSnake = () => {
    this.state.snake.forEach(this.makeSnakePart);
  };

  makeFood = () => {
    const snakeCanvas = this.snakeCanvasRef.current;
    const snakeCanvasCtx = snakeCanvas.getContext('2d');
    snakeCanvasCtx.fillStyle = 'lightgreen';
    snakeCanvasCtx.strokeStyle = 'darkgreen';
    snakeCanvasCtx.fillRect(this.state.food_x, this.state.food_y, 10, 10);
    snakeCanvasCtx.strokeRect(this.state.food_x, this.state.food_y, 10, 10);
  };

  makeSnakePart = (snakePart) => {
    const snakeCanvas = this.snakeCanvasRef.current;
    const snakeCanvasCtx = snakeCanvas.getContext('2d');
    snakeCanvasCtx.fillStyle = this.state.snake_col;
    snakeCanvasCtx.strokeStyle = this.state.snake_border;
    snakeCanvasCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeCanvasCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  };

  hasGameEnded = () => {
    for (let i = 4; i < this.state.snake.length; i++) {
      if (
        this.state.snake[i].x === this.state.snake[0].x &&
        this.state.snake[i].y === this.state.snake[0].y
      ) {
        return true;
      }
    }
    const hitLeftWall = this.state.snake[0].x < 0;
    const hitRightWall = this.state.snake[0].x > this.snakeCanvasRef.current.width - 10;
    const hitTopWall = this.state.snake[0].y < 0;
    const hitBottomWall = this.state.snake[0].y > this.snakeCanvasRef.current.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  };

  randomFood = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  };

  spawnFood = () => {
    const food_x = this.randomFood(0, this.snakeCanvasRef.current.width - 10);
    const food_y = this.randomFood(0, this.snakeCanvasRef.current.height - 10);
    this.setState(
      (prevState) => ({
        food_x,
        food_y,
      }),
      () => {
        this.state.snake.forEach((part) => {
          const hasEaten = part.x === this.state.food_x && part.y === this.state.food_y;
          if (hasEaten) this.spawnFood();
        });
      }
    );
  };

  changeDirection = (event) => {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const SPACE_KEY = 32; // Spacebar key code

    if (this.state.changing_direction) return;

    this.setState(
      (prevState) => ({
        changing_direction: true,
      }),
      () => {
        const keyPressed = event.keyCode;
        const goingUp = this.state.dy === -10;
        const goingDown = this.state.dy === 10;
        const goingRight = this.state.dx === 10;
        const goingLeft = this.state.dx === -10;

        if (keyPressed === LEFT_KEY && !goingRight) {
          this.setState({
            dx: -10,
            dy: 0,
          });
        }
        if (keyPressed === UP_KEY && !goingDown) {
          this.setState({
            dx: 0,
            dy: -10,
          });
        }
        if (keyPressed === RIGHT_KEY && !goingLeft) {
          this.setState({
            dx: 10,
            dy: 0,
          });
        }
        if (keyPressed === DOWN_KEY && !goingUp) {
          this.setState({
            dx: 0,
            dy: 10,
          });
        }
        if (keyPressed === SPACE_KEY) {
          // Toggle the paused state
          this.setState((prevState) => {
            const paused = !prevState.paused;

            // If game is resumed, start the main loop
            if (!paused) {
              this.main();
            }

            return {
              paused,
            };
          });
        }
      }
    );
  };

  moveSnake = () => {
    const head = { x: this.state.snake[0].x + this.state.dx, y: this.state.snake[0].y + this.state.dy };
    this.setState((prevState) => ({
      snake: [head, ...prevState.snake],
    }));

    const hasEatenFood = head.x === this.state.food_x && head.y === this.state.food_y;
    if (hasEatenFood) {
      this.setState(
        (prevState) => ({
          score: prevState.score + 1,
        }),
        () => {
          document.getElementById('score').innerHTML = this.state.score;
          this.spawnFood();
        }
      );
    } else {
      this.setState((prevState) => ({
        snake: prevState.snake.slice(0, -1),
      }));
    }
  };

  restartGame = () => {
    window.location.reload();
  };

  resumeGame = () => {
    this.setState({
      paused: false,
    }, () => {
      this.main();
    });
  };

  render() {
    return (
      <div className='full-height'>
        <div className="game-container">
  {this.state.countdown > 0 && (
    <div className="countdown">{this.state.countdown}</div>
  )}
  {this.state.countdown === 0 && (  // Render score only when countdown is completed
    <div className="score" id="score">{this.state.score}</div>
  )}
  <canvas
    ref={this.snakeCanvasRef}
    width={400}
    height={400}
    className="snakecanvas"
  ></canvas>
  <div className="button-container">
    <button className="restartButton btn-outline-dark" onClick={this.restartGame}>
      Restart
    </button>
    {this.state.paused && (
      <button className="resumeButton btn-outline-dark" onClick={this.resumeGame}>
        Resume
      </button>
    )}
  </div>
</div>
      </div>
    );
  }
}

export default SnakeGame;