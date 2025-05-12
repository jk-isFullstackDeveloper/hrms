import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-blue-400">Doccure</h3>
          <p className="mt-3 text-gray-400">
            Find and book doctors effortlessly with our easy-to-use platform.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Patient Links */}
        <div>
          <h3 className="text-xl font-bold text-white">Patients</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            {["Search for Doctors", "Login", "Register", "Booking", "Patient Dashboard"].map((item) => (
              <li key={item} className="hover:text-blue-400 cursor-pointer transition">{item}</li>
            ))}
          </ul>
        </div>

        {/* Doctor Links */}
        <div>
          <h3 className="text-xl font-bold text-white">Doctors</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            {["Appointments", "Chat", "Login", "Register", "Doctor Dashboard"].map((item) => (
              <li key={item} className="hover:text-blue-400 cursor-pointer transition">{item}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-white">Contact Us</h3>
          <p className="mt-3 flex items-center gap-2 text-gray-400">
            <MapPin size={18} /> 3556 Beech Street, San Francisco, CA 94108
          </p>
          <p className="mt-2 flex items-center gap-2 text-gray-400">
            <Phone size={18} /> +1 315 369 5943
          </p>
          <p className="mt-2 flex items-center gap-2 text-gray-400">
            <Mail size={18} /> doccure@example.com
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Doccure. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
