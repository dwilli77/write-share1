import React from 'react'
import {Link} from 'react-router-dom'
import {AppContext} from '../../Context'

const UserSidebar = props => {
    return (
        <AppContext.Consumer>
        {context => 
        <div className="collection col s2">
            <h4>{context.currentUser}</h4>
            <Link to="/" className="collection-item">Home</Link>
            <Link to="/mypods" className="collection-item">My Pods</Link>
            <Link to="/create" className="collection-item">Create Pod</Link>
            <Link to="/search" className="collection-item">Search Pods</Link>
        </div>
        }
        </AppContext.Consumer>
    )
}

export default UserSidebar;