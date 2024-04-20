import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div>
      <div className="py-6 bg-blue-800">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">RoomReady.com</Link>
          </span>

          <span className="flex space-x-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/my-bookings"
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                >
                  My Bookings
                </Link>

                <Link
                  to="/my-hotels"
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                >
                  My Hotels
                </Link>

                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="flex bg-white rounded-md items-center text-blue-600 px-3 font-bold hover:bg-gray-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;