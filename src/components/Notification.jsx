import React from "react"

export default class Notification extends React.Component {
  render() {
    if (this.props.errorMessage != null) {
      return <div className="error-message">{this.props.errorMessage}</div>
    }
    if (this.props.message != null) {
      return <div className="message">{this.props.message}</div>
    }
  }
}
