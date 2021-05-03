const { NavLink, withRouter } = ReactRouterDOM
import { UserMsg } from './UserMsg.jsx';


function _AppHeader(props) {

    return (
        <nav className="header">
            <UserMsg />
            <h1>My Book Shop!</h1>
            <ul className="clean-list">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/add">Add</NavLink></li>
                <li><button onClick={() => {
                    props.history.goBack()
                }}>Back</button></li>
            </ul>
        </nav>

    )
}

export const AppHeader = withRouter(_AppHeader);