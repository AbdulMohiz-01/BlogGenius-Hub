import ColorButton from "../components/ColorButton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Home, PenLine, Newspaper } from "lucide-react"; // Import your icons library here

const Navbar = () => {
  return (
    <>
      <div className="container ml-64 mr-64 flex flex-row justify-between items-center bg-white shadow-lg w-2/3 mt-4 p-3 pl-5 pr-5 custom-glass-effect sticky top-2 z-40">
        <div className="logo font-extrabold">BlogGenius Hub</div>
        <nav className="flex flex-row gap-5 nav-font">
          <NavItem title="Home" icon={<Home size={20} />} />
          <NavItem title="Write" icon={<PenLine size={20} />} />
          <NavItem title="Blogs" icon={<Newspaper size={20} />} />
        </nav>
        <div>
          <ColorButton btnText="Sign in" btnColor="primary" />
        </div>
      </div>
    </>
  );
};

const NavItem = ({ title, icon }) => {
  return (
    <Link
      to={title === "Home" ? "/" : title === "Write" ? "/write" : "/blogs"}
      className="hover:text-purple-500 transition duration-300 flex items-center gap-2"
      style={{ textDecoration: "none" }}
    >
      {icon}
      {title}
    </Link>
  );
};

// prop validation
NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default Navbar;
