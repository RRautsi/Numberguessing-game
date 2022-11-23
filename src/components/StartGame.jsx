import React from "react"
import { Navigate } from "react-router-dom"

export default class StartGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigate: false,
    }
  }

  handleClick() {
    if (this.props.name.length > 0) {
      this.setState({ ...this.state, navigate: true })
      this.props.setNumberToGuess()
    }
  }

  render() {
    const leaderboard = this.props.leaderboard.map((player) => {
      return (
        <React.Fragment key={player.id}>
          <p className="text-lg flex justify-center mr-1">{player.name}</p>
          <p className="text-lg flex justify-center mr-1">{player.guessCount}</p>
        </React.Fragment>
      )
    })
    return (
      <>
        <div className="mt-8">
          <h1 className="text-2xl md:text-5xl flex justify-center underline">
            Welcome to Numberguessing game!
          </h1>
          <h1 className="text-xl md:text-2xl flex justify-center my-3 mt-10">
            Please enter your name
          </h1>
          <input
            type="text"
            onChange={this.props.handleInput}
            className="input-style"
          />
          <button
            onClick={this.handleClick.bind(this)}
            className="button-custom mt-3"
          >
            Start game
          </button>
          <h1 className="text-center text-2xl mt-6">LEADERBOARD</h1>
          <div className="grid grid-cols-2 m-auto border border-black rounded-xl w-80 md:w-96 my-3 p-2">
            <h1 className="text-xl flex justify-center">Name</h1>
            <h1 className="text-xl flex justify-center">Guess count</h1>
            {leaderboard}
          </div>
          {this.state.navigate && <Navigate to="/game" replace={true} />}
        </div>
      </>
    )
  }
}
