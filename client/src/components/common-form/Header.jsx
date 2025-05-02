import { Link } from "react-router-dom";
import logo from "/logo.png"; // Update the path to the correct location

function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex bg-black text-white items-center border-b" style={{ fontFamily: 'Helvetica' }}>
      <Link to={"/"} className="flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-4" />
        <span className="font-extrabold md:text-xl text-[14px]">
          ODC LEARNING
        </span>
      </Link>
    </header>
  );
}

export default Header;
