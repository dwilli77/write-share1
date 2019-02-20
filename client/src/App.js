import React, { Component } from 'react';
import './App.css';
import {AppProvider, AppContext} from './Context'
import Navbar from './components/Navbar'
import StaticSidebar from './components/StaticSidebar'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyPods from './pages/MyPods'
import Login from './pages/Login'
import CreatePod from './pages/CreatePod'
import SearchPods from './pages/SearchPods'
import Pod from './pages/Pod'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <AppProvider>
          <Navbar />
          <div className="row content-area">
            <div className="col s10">
              <AppContext.Consumer>
                {value => {
                  const {currentUser, currentUserId} = value
                  return(
                  <>
                    <Route exact path="/" component={currentUser ? Dashboard : Welcome} />
                    <Route exact path="/register" render={() => (
                      currentUser ? (
                        <Redirect to="/" />
                      ) : (
                        <Register />
                      )
                      )} />
                    <Route exact path="/login" render={() => (
                      currentUser ? (
                        <Redirect to="/" /> 
                      ) : (
                        <Login/>
                      )
                      )} />
                    <Route exact path="/mypods" render={() => (
                      currentUser ? (
                        <MyPods userId={currentUserId}/>
                      ) : (
                        <Redirect to="/" />
                      )
                    )} />
                    <Route exact path="/create" render={() => (
                      !currentUser ? (
                        <Redirect to="/" />
                      ) : (
                        <CreatePod userId={currentUserId} user={currentUser} />
                      )
                      )} />
                      <Route exact path="/search" render={() => (
                      !currentUser ? (
                        <Redirect to="/" />
                      ) : (
                        <SearchPods />
                      )
                      )} />
                      <Route path="/pods/:id" render={(props) => (
                      !currentUser ? (
                        <Redirect to="/" />
                      ) : (
                        <Pod {...props}/>
                      )
                      )} />
                  </>
                  
              )}}
              </AppContext.Consumer>
            </div>
            <StaticSidebar />
          </div>
        </AppProvider>
      </Router>
    );
  }
}

export default App;
