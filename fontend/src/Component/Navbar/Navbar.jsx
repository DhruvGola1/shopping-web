import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="nav-container">
      <div className="navleft">
        <Link
          className={`navleft-link ${
            location.pathname === "/" ? "actcls" : ""
          }`}
          to="/"
        >
          Home
        </Link>
      </div>
      <div className="navright">
        <Link
          to="/task1"
          className={`navright-link1 ${
            location.pathname === "/task1" ? "actcls" : ""
          }`}
        >
          Task1
        </Link>
        <Link
          to="/task2"
          className={`navright-link1 ${
            location.pathname === "/task2" ? "actcls" : ""
          }`}
        >
          Task2
        </Link>
        <Link
          to="/task3"
          className={`navright-link1 ${
            location.pathname === "/task3" ? "actcls" : ""
          }`}
        >
          Task3
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
