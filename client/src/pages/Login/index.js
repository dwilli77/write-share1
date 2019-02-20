import React from 'react'
import {AppContext} from '../../Context'
import API from '../../utils/API'


class Login extends React.Component {
    state = {
        email: "",
        password: "",
        currentUser: "",
        currentUserId: "",
        loginFail: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      handleLogin = () => {
        API.login({
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            if (res.data === 'no user' || res.data === 'incorrect password') {
                this.setState({loginFail: true, password: ""});
            }else{
                this.setState({currentUser: res.data.username, currentUserId:res.data._id})
            }
        })
        .catch(err => console.log(err))
    }

    render() {
    return (
        <AppContext.Consumer>
            {value => {
                const {contextLogin} = value;
                return(
                <div className="container login-form">
                    <div className="row">
                        <h4>Log In Here</h4>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">computer</i>
                            <input id="email" type="email" className="validate black-text" name="email" onChange={this.handleInputChange} value={this.state.email}/>
                            <label className="black-text" htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">perm_identity</i>
                            <input id="password1" type="password" name="password" className="validate black-text" onChange={this.handleInputChange} value={this.state.password}/>
                            <label className="black-text" htmlFor="password1">Password</label>
                        </div>
                    </div>
                    {this.state.loginFail ? (
                        <div className="card-panel red lighten-3 red-text text-darken-4">Login Failed: Try Again</div>
                    ): (
                        ""
                    )}

                    {this.state.currentUser ? contextLogin(this.state.currentUser, this.state.currentUserId) : ""}
                    
                    <button className="btn waves-effect waves-light btn-large right main-button-font submit-button orange darken-3"  onClick={this.handleLogin}>Submit
                            <i className="material-icons right">send</i>
                    </button>

                </div>

                )
                }}
        </AppContext.Consumer>
    )
    }
}

export default Login;