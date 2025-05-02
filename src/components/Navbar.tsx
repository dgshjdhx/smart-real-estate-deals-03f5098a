
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {
  hideButtons?: boolean;
}

const Navbar = ({ hideButtons = false }: NavbarProps) => {
  return (
    <nav className="bg-white py-4 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-primary">DealTracker</h1>
        </Link>
        
        {!hideButtons && (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Start Free</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
