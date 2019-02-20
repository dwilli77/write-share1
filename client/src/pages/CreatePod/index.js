import React from 'react'
import UserSidebar from '../../components/UserSidebar'
import API from '../../utils/API'

class CreatePod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userId: props.userId, user: props.user, podName: "", topic: "", numParticipants: "", newPodCreated: false, createFail: false};
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      handleNewPod = () => {
        API.createPod({
            userId: this.state.userId,
            topic: this.state.topic,
            name: this.state.podName,
            creator: this.state.user,
            creatorId: this.state.userId,
            numParticipants: this.state.numParticipants,
            activeParticipant: this.state.user,
            totalParticipants: [this.state.user],
            participantIds:[this.state.userId]
        }).then(res => {
            if (res.status === 200) {
                this.setState({newPodCreated: true, podName: "", topic: "", numParticipants: ""})
            } else {
                this.setState({createFail: true, podName: "", topic: "", numParticipants: ""})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    checkInputs = () => {
        return (
            this.state.podName.length > 0 &&
            this.state.topic.length > 0 &&
            this.state.numParticipants > 1 &&
            this.state.numParticipants < 5
        )
    }

    render() {
    return (
        <>
            <UserSidebar/>
            <div className="col s10">
            <div className="row">
                <h4>Create a New Writing Pod</h4>
            </div>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s8">
                        <input name="podName" value={this.state.podName} id="new-pod-name" type="text" className="validate" onChange={this.handleInputChange} />
                        <label className="black-text" htmlFor="new-pod-name">Pod Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8">
                        <input name="topic" value={this.state.topic} id="new-pod-topic" type="text" className="validate" onChange={this.handleInputChange} />
                        <label className="black-text" htmlFor="new-pod-topic">Topic</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s5">
                        <input name="numParticipants" value={this.state.numParticipants} id="new-pod-user-count" type="number" min="1" max="4" className="validate" onChange={this.handleInputChange} />
                        <label className="black-text" htmlFor="new-pod-user-count">Maximum User Count (4 max)</label>
                        </div>
                    </div>
                    </div>
                </div>

                {this.state.newPodCreated ? (
                    <div className="card-panel green lighten-3 green-text text-darken-4 center-align">New Pod Created!</div>
                ): (
                    ""
                )}

                {this.state.createFail ? (
                    <div className="card-panel red lighten-3 red-text text-darken-4">Pod Creation Failed: Try Again</div>
                ): (
                    ""
                )}

                <button disabled={!this.checkInputs()} className="btn waves-effect waves-light btn-large right main-button-font orange darken-3"  onClick={this.handleNewPod}>Submit
                            <i className="material-icons right">send</i>
                    </button>
            </div>
        </>
    )
    }
}

export default CreatePod;