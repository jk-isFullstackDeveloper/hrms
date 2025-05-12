import { useState } from "react";
import { Menu, X, User, Phone, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Left Section (Logo + Links) */}
        <div className="flex items-center gap-10">
          <a href="/" className="text-2xl font-bold text-blue-600">
            Doccure
          </a>
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li>
              <a href="/" className="hover:text-blue-500 transition">Home</a>
            </li>
            <li>
              <a href="/doctors" className="hover:text-blue-500 transition">Doctors</a>
            </li>
            <li>
              <a href="/patients" className="hover:text-blue-500 transition">Patients</a>
            </li>
          </ul>
        </div>

        {/* Right Section (Contact + Login/Signup) */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition">
            <Phone size={18} /> Contact
          </a>
          <a href="/login" className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition">
            <LogIn size={18} /> Login
          </a>
          <a
            href="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Signup
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-[100%] py-4">
          <ul className="text-center space-y-4 text-gray-700">
            <li>
              <a href="/" className="block hover:text-blue-500">Home</a>
            </li>
            <li>
              <a href="/doctors" className="block hover:text-blue-500">Doctors</a>
            </li>
            <li>
              <a href="/patients" className="block hover:text-blue-500">Patients</a>
            </li>
            <li>
              <a href="/contact" className="block hover:text-blue-500">Contact</a>
            </li>
            <li>
              <a href="/login" className="block hover:text-blue-500">Login</a>
            </li>
            <li>
              <a href="/signup" className="block bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700">
                Signup
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
