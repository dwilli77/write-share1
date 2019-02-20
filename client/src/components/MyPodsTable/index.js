import React from 'react';
import { Link } from 'react-router-dom'

const MyPodsTable = props => {

    return (
        <div className="col s12 container">
        <table className="pod-table">
        <thead>
          <tr>
              <th>Name</th>
              <th>Topic</th>
              <th>Active Participant</th>
          </tr>
        </thead>

        <tbody>
            {props.pods.map(pod => {
                return(
                <tr key={pod._id}>
                    <td className="pod-link"><Link to={"./pods/"+pod._id}>{pod.name}</Link></td>
                    <td>{pod.topic}</td>
                    <td>{pod.activeParticipant}</td>
                </tr>
                )
            })}
        </tbody>
      </table>
      </div>
    )
}

export default MyPodsTable;