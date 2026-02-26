import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">Prince</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/product-form">
                Product Form
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/product-list">
                Product List
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Header;