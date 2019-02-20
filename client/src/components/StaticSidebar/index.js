import React from 'react';

const StaticSidebar = props => {
    return (
        <div className="side-nav collection col s2">
            <p className="collection-item">Helpful Links</p>
            <a href="https://thestorystarter.com" className="collection-item" target="_blank" rel="noopener noreferrer">Story Starter</a>
            <a href="https://pw.org/content/literary-magazines" className="collection-item" target="_blank" rel="noopener noreferrer">Literary Magazines</a>
            <a href="https://copyright.gov" className="collection-item" target="_blank" rel="noopener noreferrer">copyright.org</a>
            <a href="https://writingcenter.unc.edu/tips-and-tools/group-writing/" className="collection-item" target="_blank" rel="noopener noreferrer">Tips</a>
        </div>
    )
}

export default StaticSidebar;