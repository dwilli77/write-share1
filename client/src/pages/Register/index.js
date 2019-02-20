import React from 'react';
import { AppContext } from '../../Context';
import API from '../../utils/API'


class Register extends React.Component {
    state = {
        email: "",
        username: "",
        password: "",
        password2: "",
        about_me: "",
        currentUser: "",
        currentUserId: "",
        registerFail: false
    }

    checkInputs = () => {
        return this.state.password.length > 5 && 
        this.state.password === this.state.password2 &&
        this.state.username.length > 0 &&
        this.state.email.length > 4
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      handleRegister = () => {
        API.register({
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            aboutMe: this.state.about_me
        }).then(res => {
            if (res.status === 200 && res.data !== 'user already exists'){
                this.setState({currentUser: res.data.username, currentUserId:res.data._id})
            } else {
                this.setState({registerFail: true})
            }
        }).catch(err=> console.log(err))
    }

    render() {
    return (
        <AppContext.Consumer>
            {value=> {
                const {contextLogin} = value;
                return (
        <div className="container">
            <div className="row">
                <h4>New User Registration</h4>
            </div>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">computer</i>
                            <input id="email" type="email" className="validate black-text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                            <label className="black-text" htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_box</i>
                            <input id="username" type="text" className="validate black-text" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                            <label className="black-text" htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">perm_identity</i>
                            <input id="password1" type="password" className="validate" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                            <label className="black-text" htmlFor="password1">Password (6 character minimum)</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">perm_identity</i>
                            <input id="password2" type="password" className="validate" name="password2" value={this.state.password2} onChange={this.handleInputChange}/>
                            <label className="black-text" htmlFor="password2">Re-Enter Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">mode_edit</i>
                                    <textarea id="icon_prefix2" className="materialize-textarea" name="about_me" value={this.state.about_me} onChange={this.handleInputChange}></textarea>
                                    <label className="black-text" htmlFor="icon_prefix2">About Me...</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.registerFail ? (
                        <div className="card-panel red lighten-3 red-text text-darken-4">Registration Failed: Try Again - email may already be in use</div>
                    ): (
                        ""
                    )}

                    {this.state.currentUser ? contextLogin(this.state.currentUser, this.state.currentUserId) : ""}

                    <button disabled={!this.checkInputs()} className="btn waves-effect waves-light btn-large right main-button-font orange darken-3"   onClick={this.handleRegister} >Submit
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
                )
        }}
        </AppContext.Consumer>
    )
    }
}

export default Register;