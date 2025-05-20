import { Link } from "react-router"

const Navbar = () => {
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
        </div>
    </header>
  )
}

export default Navbar