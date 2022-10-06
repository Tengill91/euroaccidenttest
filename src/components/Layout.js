import { Outlet } from "react-router-dom"

// layout for routes
const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout
