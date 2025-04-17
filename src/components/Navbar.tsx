
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, User, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-brand-purple" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-lightBlue bg-clip-text text-transparent">
              DriveEasy
            </span>
          </Link>

          {!isMobile ? (
            <div className="flex items-center gap-8">
              <div className="flex gap-6">
                <Link to="/" className="text-gray-700 hover:text-brand-purple transition-colors">
                  Home
                </Link>
                <Link to="/cars" className="text-gray-700 hover:text-brand-purple transition-colors">
                  Cars
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-brand-purple transition-colors">
                  About Us
                </Link>
              </div>

              <div className="flex items-center gap-3">
                {isLoggedIn ? (
                  <>
                    <Link to="/bookings">
                      <Button variant="outline" className="text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white">
                        My Bookings
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="text-brand-purple hover:bg-brand-purple/10"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="text-brand-purple hover:bg-brand-purple/10">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMenu}
              className="text-brand-purple"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && isOpen && (
          <div className="mt-4 pb-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-700 hover:text-brand-purple py-2 transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/cars" className="text-gray-700 hover:text-brand-purple py-2 transition-colors" onClick={() => setIsOpen(false)}>
              Cars
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-purple py-2 transition-colors" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            
            <div className="flex flex-col gap-2 mt-2">
              {isLoggedIn ? (
                <>
                  <Link to="/bookings" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white">
                      My Bookings
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full text-brand-purple hover:bg-brand-purple/10"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full text-brand-purple hover:bg-brand-purple/10">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
