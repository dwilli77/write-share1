import React from 'react'
import MyPodsTable from '../../components/MyPodsTable'
import UserSidebar from '../../components/UserSidebar'
import API from '../../utils/API'

class MyPods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userId: props.userId, pods: []};
      }

    

    componentDidMount() {
        console.log(this.state.userId)
        API.getMyPods({userId: this.state.userId})
        .then(res => {
            console.log(res)
            this.setState({pods: res.data})
        })
        .catch(err => console.log(err))
    }
    
    render(){
    return (
        <>
            <UserSidebar />
            <div className="col s10">
            <div className="container">         
            <nav id="my-pod-searchbar">
                <div className="nav-wrapper">
                <form>
                    <div className="input-field">
                    <input className="blue lighten-1" id="search" type="search" placeholder="Search My Pods" required />
                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                    </div>
                </form>
                </div>
            </nav>
            <h4>My Current Pods</h4>
            {this.state.pods.length ? (
            <MyPodsTable pods={this.state.pods} />
            ) : (
                <p>No Current Pods</p>
            )
            }
            </div>
            </div>
        </>
    )
    }
}

export default MyPods;