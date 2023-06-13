import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  removed = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-bg">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="logo"
          />
          <button type="button" className="bt1" onClick={this.removed}>
            Logout
          </button>
        </div>
        <div className="card">
          <h1 className="head1">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="card-pic"
          />
        </div>
      </div>
    )
  }
}
export default Home
