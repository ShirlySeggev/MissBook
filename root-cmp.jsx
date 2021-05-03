const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM

import { BookApp } from './pages/BookApp.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookAdd } from './pages/BookAdd.jsx'




export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>

            <main>
                <Switch>
                    <Route component={BookDetails} path="/book/:bookId" />
                    <Route component={BookAdd} path="/add" />
                    <Route component={BookApp} path="/book" />
                    <Route component={AboutUs} path="/about" />
                    <Route component={Home} path="/" />
                </Switch>
            </main>

            <footer>
                coffeerights &copy;
            </footer>
        </Router>

    )
}




