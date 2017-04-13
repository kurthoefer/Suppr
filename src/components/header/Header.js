import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import SearchBar from './SearchBar'

const Dropdown = (props) => {
  const profileLink = `/profile/${props.username}`
  return (
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
        <div className="drop-block">
          <img src="http://i.imgur.com/hfH9CiC.png" className="drop-block-image"/>
          Account
          <i className="fa fa-angle-down drop-block-icon" aria-hidden="true"></i>
        </div>
      </a>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="Preview">
        <a className="dropdown-item drop-inner-item" href={profileLink}>
          <span className="drop-inner-item-text">
            <i className="fa fa-user drop-inner-item-icon" aria-hidden="true"></i>
            My Profile
          </span>
        </a>
          <Link className="dropdown-item drop-inner-item" to="/create">
            <span className="drop-inner-item-text">
            <i className="fa fa-cutlery drop-inner-item-icon" aria-hidden="true"></i>
              Create a Recipe
            </span>
          </Link>
        <a className="dropdown-item drop-inner-item" href="/auth/signout">
          <span className="drop-inner-item-text">
            <i className="fa fa-sign-out drop-inner-item-icon" aria-hidden="true"></i>
            Signout
          </span>
        </a>
      </div>
    </li>
  )
}

class Header extends Component {
  renderLinks() {
    if (!this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/auth/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/auth/signup">Sign Up</Link>
        </li>
      ]
    } 
  }
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/">Suppr</Link>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">   
          {this.renderLinks()}
        </ul>
        <SearchBar />
        <ul className="navbar-nav">
          {this.props.authenticated && <Dropdown username={this.props.username}/>}
        </ul>
      </div>
    </nav>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, username: state.auth.username };
}

export default connect(mapStateToProps)(Header);