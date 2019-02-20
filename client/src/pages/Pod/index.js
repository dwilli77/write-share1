import React from 'react';
import { AppContext } from '../../Context';
import API from '../../utils/API';
import UserSidebar from '../../components/UserSidebar';
import PodNav from '../../components/PodNav'

class Pod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            podId: this.props.match.params.id,
            activeParticipant: "",
            creator: "",
            creatorId: "",
            name: "",
            numParticipants: 0,
            participantIds: [],
            topic: "",
            totalParticipants: [],
            content: [],
            newContent: ""
        };
      }

    componentDidMount() {
        this.getPodData()
    }

    getPodData = () => {
        API.getOnePod({podId: this.state.podId})
        .then(res => {
            console.log(res);
            this.setState({
                activeParticipant: res.data.activeParticipant,
                creator: res.data.creator,
                creatorId: res.data.creatorId,
                name: res.data.name,
                numParticipants: res.data.numParticipants,
                participantIds: res.data.participantIds,
                topic: res.data.topic,
                totalParticipants: res.data.totalParticipants,
                content: res.data.content
            })
        })
        .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
      };

    yourTurn = (username, id) => {
        return (this.state.activeParticipant === username) && (this.state.participantIds.indexOf(id) > -1)
    };

    postContent = () => {
        API.newContent({
            contentText: this.state.newContent,
            contentCreator: this.state.activeParticipant,
            podId: this.state.podId
        })
        .then(res => {
            this.iterateUser();
            this.setState({newContent: ""})
        })
        .catch(err=> console.log(err))
    }

    iterateUser = () => {
        let currentIndex= this.state.totalParticipants.indexOf(this.state.activeParticipant);
        let num = this.state.totalParticipants.length - 1;
        let newIndex;

        if(currentIndex === num) {
            newIndex = 0
        } else {
            newIndex = currentIndex +1
        }

        API.nextUser({
            newActive: this.state.totalParticipants[newIndex],
            podId: this.state.podId
        })
        .then(res => {
            this.getPodData()
        })
    }

    joinPod = (userId, username) => {
        if(this.state.totalParticipants.length >= this.state.numParticipants) {
            return;
        }
        API.joinPod({
            userId: userId,
            username: username,
            podId: this.state.podId
        })
        .then(res => this.getPodData())
        .catch(err => console.log(err));
    }

    render() {
        return (
        <AppContext.Consumer>
            {value => {
                return (
                    <>
                        <UserSidebar />
                        <div className="col s10">
                        <PodNav iterateUser={this.iterateUser} joinPod={this.joinPod} podData={this.state} currentUserId={value.currentUserId} currentUser={value.currentUser}/>
                        {this.state.totalParticipants.length ? (<p>Pod Participants: {this.state.totalParticipants.join(", ")}</p>) : ("")}
                        <div className="row">
                        <div className="col s12">
                            <div className="row">
                            <div className="input-field col s12">
                                <textarea name="newContent" value={this.state.newContent} disabled={!this.yourTurn(value.currentUser, value.currentUserId)} id="textarea1" className="materialize-textarea" length="3000" onChange={this.handleInputChange}></textarea>
                                <label htmlFor="textarea1">Your Content Here</label>
                            </div>
                            </div>
                            <button disabled={!this.yourTurn(value.currentUser, value.currentUserId)} className="btn right green lighten-2 black-text" onClick={this.postContent}>Post<i className="material-icons right">add_circle_outline</i></button>
                        </div>
                        </div>

                        <h3>Story Time:</h3>
                        {!this.state.content.length ? (
                            <div className="row">
                                <div className="col s12">
                                    <div className="card-panel teal">
                                        <span className="white-text">No Content Yet!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            this.state.content.map(block => {
                                return(
                                    <div class="row" key={block.contentText}>
                                        <div class="col s12">
                                        <div class="card blue-grey lighten-1">
                                            <div class="card-content white-text">
                                            <p className="white-text content-font">{block.contentText}</p>
                                            </div>
                                            <div class="card-action">
                                            <p className="written-by">Written By: {block.contentCreator}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}

                        </div>
                    </>
                )
            }}

        </AppContext.Consumer>
        )
    }

}


export default Pod;