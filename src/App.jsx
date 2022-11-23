import React from "react"
import StartGame from "./components/StartGame"
import PlayGame from "./components/PlayGame"
import { Routes, Route } from "react-router-dom"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      numberToGuess: 0,
      leaderboard: [],
      id: 0
    }
    this.handleInput = this.handleInput.bind(this)
    this.setNumberToGuess = this.setNumberToGuess.bind(this)
  }

  handleInput = (e) =>
    this.setState({
      ...this.state,
      name: e.target.value,
    })

  setNumberToGuess = () => {
    this.setState({
      ...this.state,
      numberToGuess: Math.floor(Math.random() * 100 + 1),
    })
  }

  setLeaderboard = (playerObject) => {
    playerObject.id = this.state.id
    this.setState({leaderboard: [...this.state.leaderboard, playerObject], id: this.state.id + 1})
  }

  render() {
    console.log(this.state.leaderboard)
    return (
      <div className="h-screen overflow-auto bg-gradient-to-t from-emerald-500 via-green-400 to-emerald-500">
        <Routes>
          <Route
            exact path="/"
            element={
              <StartGame
                handleInput={this.handleInput}
                setNumberToGuess={this.setNumberToGuess}
                name={this.state.name}
                leaderboard={this.state.leaderboard}
              />
            }
          />
          <Route
            path="/game"
            element={
              <PlayGame
                numberToGuess={this.state.numberToGuess}
                name={this.state.name}
                setLeaderboard={this.setLeaderboard}
              />
            }
          />
        </Routes>
      </div>
    )
  }
}
export default App
