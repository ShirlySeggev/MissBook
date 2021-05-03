const { Link, NavLink, Route } = ReactRouterDOM

export function Home() {
    return <section className="home-container">
        <h1>Welcome!!!</h1>
        <h3>Check out our awesome <Link to="/book">books</Link></h3>
        <img src="/assets/img/hello.gif" />
    </section>
}