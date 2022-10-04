import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Where are we?</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/login">go back</Link>
            </div>
        </article>
    )
}

export default Missing