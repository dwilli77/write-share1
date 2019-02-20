import React from 'react';

const AppContext = React.createContext();

class AppProvider extends React.Component {
    state = {
        currentUser: "",
        currentUserId: null,
    }

    contextLogin = (name,id) => {
        this.setState({currentUser: name, currentUserId: id})
    }

    handleLogout = () => {
        this.setState({currentUser: "", currentUserId: null})
    }

    render() {
        return (
            <AppContext.Provider value={{
                currentUser: this.state.currentUser,
                currentUserId: this.state.currentUserId,
                contextLogin: this.contextLogin,
                handleLogout: this.handleLogout,
                }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export { AppProvider, AppContext } ;