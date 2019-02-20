import React from 'react'
import UserSidebar from '../../components/UserSidebar'
import {AppContext} from '../../Context'
import API from '../../utils/API';
import {Link} from 'react-router-dom'


class Dashboard extends React.Component {
    state = {
        pods: [],
        currentUser: "",
        currentUserId: ""
    }

    findYourTurn = (id,username) => {
        API.findYourTurn({
            id: id,
            username: username
        })
        .then(res => this.setState({pods: res.data}))
        .catch(err => console.log(err));
    }

    render(){
        return (
            <AppContext.Consumer>
                {(context) => {
                    return(
                        <>
                            <UserSidebar />
                            <div className="col s10">
                                <h4>Hi {context.currentUser}! Welcome to Write Share!</h4>
                                <p>Search, Create, and Navigate Pods on the left sidebar</p>
                                <h5>It's your turn in these Pods:</h5>
                                {this.state.pods.length ? (this.state.pods.map(pod => {
                                    return(
                                          <div className="row" key={pod._id}>
                                          <div className="col s8">
                                            <div className="card blue-grey darken-1">
                                              <div className="card-content white-text">
                                                <span className="card-title your-turn-title">{pod.name}</span>
                                                {pod.content.length ? (
                                                <>
                                                    <p>Previous Post: written by {pod.content[pod.content.length -1].contentCreator}</p>
                                                    <hr/>
                                                    <p>{pod.content[pod.content.length -1].contentText}</p>
                                                </>
                                                ) : (
                                                    <p>No Content in This Pod Yet</p>
                                                )}
                                              </div>
                                              <div className="card-action">
                                              <Link to={"./pods/"+pod._id}>Click Here to Write</Link>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                    )
                                })) : (
                                    <div className="row">
                                        <div className="col s8 ">
                                        <div className="card-panel blue-grey darken-1">
                                            <span className="white-text">It's not your turn in any of your Pods
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {this.findYourTurn(context.currentUserId, context.currentUser)}
                        </>
                    )}}
            </AppContext.Consumer>
        )
    }
}

export default Dashboard;