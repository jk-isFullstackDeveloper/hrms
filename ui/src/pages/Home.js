import { CalendarDays, MapPin, Star, UserCheck } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";



export default function Home() {
  return (
    <div className="w-full overflow-y-scroll max-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-900">HRMS CRM</h1>
        <nav className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">Login</button>
        </nav>
      </header>
      {/* <Navbar/> */}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-white">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-blue-900 leading-tight mb-4">
            Streamline Your <br /> HR Processes
          </h2>
          <p className="text-gray-600 mb-6">
            Simplify employee management, payroll, and recruitment with our
            all-in-one HR platform.
          </p>
          <button className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800">
            Get Started
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1050&q=80"
          alt="HR team working"
          className="w-full md:w-1/2 mt-10 md:mt-0 rounded-lg shadow-lg"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 px-6 md:px-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Employee Management"
            desc="Centralize employee information and streamline HR tasks."
          />
          <FeatureCard
            title="Payroll Automation"
            desc="Automate payroll calculations and manage compliance."
          />
          <FeatureCard
            title="Leave & Attendance"
            desc="Track employee attendance and manage leave requests."
          />
        </div>
      </section>

      {/* Duplicate Section for Scrollability */}
      <section className="bg-white py-20 px-6 md:px-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">More Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Performance Reviews"
            desc="Evaluate and improve employee performance with ease."
          />
          <FeatureCard
            title="Recruitment"
            desc="Manage hiring pipeline and applicant tracking."
          />
          <FeatureCard
            title="Custom Roles & Permissions"
            desc="Control who sees and does what in the system."
          />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-900 text-white py-10 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">About HRMS CRM</h4>
            <p className="text-sm text-gray-300">
              HRMS CRM helps streamline all your human resource management
              needs into a single, powerful platform.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm text-gray-300">Email: support@hrmscrm.com</p>
            <p className="text-sm text-gray-300">Phone: +1 800 123 4567</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">&copy; 2025 HRMS CRM. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, desc }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
    <h4 className="text-xl font-semibold text-blue-900 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);




