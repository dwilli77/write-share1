import React from "react";

const PodNav = props => {
  return (
    <>
      <nav className="col s12 blue darken-3 white-text">
        <div className="nav-wrapper" id="mypod-nav">
          <h2 className="brand-logo center pod-name">
            {props.podData.name}
          </h2>
          <ul className="left">
          {(props.podData.activeParticipant === props.currentUser) && (props.podData.participantIds.indexOf(props.currentUserId) > -1) ? (
              <li>
                <button className="btn red accent-2" onClick={props.iterateUser}>Skip Turn</button>
              </li>
            ) : (
              ""
            )}
            {props.podData.participantIds.indexOf(props.currentUserId) === -1 ? (
                <li>
                    <button onClick={()=> props.joinPod(props.currentUserId, props.currentUser)} className="btn yellow darken-2 black-text">Join</button>
                </li>
            ) : (
                ""
            )}
          </ul>
          <ul id="nav-mobile" className="right">
            <li>
              <p id="active-writer">Active Writer: {props.podData.activeParticipant}</p>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default PodNav;
