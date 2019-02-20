import React from 'react'
import { Link } from "react-router-dom";


const Welcome = props => {
    return (
        <div className="welcome-content">
            <h1>Welcome to Write-Share!!! Creativity made Easy!</h1>
            <p>Write Share is a dynamic tool used to improve the writing skills of everyone through collaboration.  Ideas curated within groups lend themselves towards a more fruit-full product.  Working within groups improves both confidence and productivity. Sharing work creates a culture of accountability and self-worth.</p>
            <p>How do we work?</p>
            <p>Followed by a video tutorial to registering/login writing your first pod</p>

            <h4 className="registration-link"><Link to="/register">Register Here and Start Writing Today</Link></h4>
        </div>        
    )

}

export default Welcome;