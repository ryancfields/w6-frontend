import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'
import * as auth from '../api/auth.js'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null 
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
  }

  async componentDidMount () {
    //Check to see if a local token is present.
    const token = window.localStorage.getItem('journal-app')

    // If there is a local token, call auth profile and get the current user _id.

    if (token) {
      const profile = await auth.profile()
      try {
        //Finaly set the state of the current user ID to the one that is retrived by the token:
        this.setState({ currentUserId: profile.user._id })
      } catch (e) { }
    }
  }

  async loginUser (user) {
    
    await auth.login(user)
    const profile = await auth.profile()

    this.setState({ currentUserId: profile.user._id })
  }

  async signupUser (user) {
    await auth.signup(user)
    const profile = await auth.profile()

    this.setState({ currentUserId: profile.user._id })
  }
  
  logoutUser = () => {
    window.localStorage.removeItem('journal-app')
    this.setState({ currentUserId: null })  
  }

  render () {
    return (
      <Router>
        <Header />
        <Navigation 
        currentUserId={this.state.currentUserId} 
        logoutUser={this.logoutUser}
        />
        <Switch>
          <Route path='/login' exact component={() => {
            return <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' render={() => {
            return this.state.currentUserId ? <UsersContainer /> : <Redirect to='/login' />
          }} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
