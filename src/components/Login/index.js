import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', userPin: '', showError: '', isTrue: false}

  failure = msg => {
    this.setState({showError: msg, isTrue: true})
  }

  success = JwtToken => {
    Cookies.set('jwt_token', JwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submit = async event => {
    const {userName, userPin} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/ebank/login'
    const loginDetails = {
      user_id: userName,
      pin: userPin,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  changeUser = event => {
    this.setState({userName: event.target.value})
  }

  changePin = event => {
    this.setState({userPin: event.target.value})
  }

  render() {
    const {showError, isTrue} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="pic"
          />
          <form className="text-container" onSubmit={this.submit}>
            <h1 className="head">Welcome Back!</h1>
            <label htmlFor="user" className="l">
              User ID
            </label>
            <input
              type="text"
              id="user"
              className="input"
              placeholder="Enter User ID"
              onChange={this.changeUser}
            />
            <label htmlFor="pin" className="l">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              className="input"
              placeholder="Enter PIN"
              onChange={this.changePin}
            />
            <button type="submit" className="bt">
              Login
            </button>
            {isTrue && <p className="para">{showError}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
