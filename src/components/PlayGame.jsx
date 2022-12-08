import React from "react"
import { Navigate } from "react-router-dom";
import Notification from "./Notification"

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upperLimit: 100,
      lowerLimit: 1,
      guessCount: 0,
      lastGuess: 0,
      guessValue: "",
      errorMessage: null,
      message: null,
      inputDisabled: false,
      navigateHome: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  setNavigateToHome = () => this.setState({navigateHome: true})

  onChange = (e) => this.setState({guessValue: e.target.value})

  onSubmit(e) {
    e.preventDefault()
    const input = Number(this.state.guessValue)
    const target = this.props.numberToGuess
    if (input <= Number(this.state.upperLimit) && input >= Number(this.state.lowerLimit)) {
      if (input < target) {
        this.setState({lowerLimit: input, errorMessage: "Your guess was too low"})
        setTimeout(() => this.setState({errorMessage: null}), 3000)
      } else if (input > target) {
        this.setState({upperLimit: input, errorMessage: "Your guess was too high"})
        setTimeout(() => this.setState({errorMessage: null}), 3000)
      } else {
        this.setState({message: "Congratulations, you won! Correct number was: " + this.props.numberToGuess, inputDisabled: true})
        this.props.setLeaderboard({name: this.props.name, guessCount: this.state.guessCount + 1})
      }
      this.setState({
        lastGuess: this.state.guessValue,
        guessCount: this.state.guessCount + 1,
        guessValue:""
      })
      return
    } else {
    this.setState({errorMessage: "Your guess was not in correct range"})
    setTimeout(() => this.setState({errorMessage: null}), 3000)
    }
  }

  render() {
    console.log(this.props.numberToGuess)
    const lowerLimit = this.state.lowerLimit
    const upperLimit = this.state.upperLimit
    const isNumber = Number(this.state.guessValue)
    const isEmpty = this.state.guessValue === ""
    const isCorrectAnswer = Number(this.state.lastGuess) === this.props.numberToGuess
    return (
      <React.Fragment>
        <h1 className="text-center text-4xl mt-10">
          Try to guess number between {lowerLimit}-{upperLimit}
        </h1>
        {isNumber || isEmpty ? <br /> : <h1 className="text-center text-xl mt-2">Only numbers allowed!</h1>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="guessValue"
            id="guessValue"
            className="input-style mt-5"
            disabled={this.state.inputDisabled}
            onChange={this.onChange}
            value={this.state.guessValue}
          />
          <button
            type="submit"
            disabled={isNumber ? false : true}
            className={isNumber ? "button-custom mt-5" : "button-custom-disabled mt-5"}
          >
            Guess!
          </button>
        </form>
        <div className="text-center text-2xl mt-10">Guess count: {this.state.guessCount}</div>
        <Notification errorMessage={this.state.errorMessage} message={this.state.message}/>
        {isCorrectAnswer ? <button onClick={this.setNavigateToHome} className="button-custom mt-5 p-3">Restart</button> : <br/>}
        {this.state.navigateHome && <Navigate to="/" replace={true}/>}
      </React.Fragment>
    )
  }
}
