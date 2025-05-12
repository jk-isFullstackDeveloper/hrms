import { BarChart, Calendar, DollarSign, HeartPulse, User, Users, CheckCircle, Clock } from "lucide-react";
import RevenueChart from "../../components/RevenueChart";
import StatusChart from "../../components/StatusChart";

const stats = [
  { title: "Total Doctors", value: "56", icon: <User size={28} className="text-blue-500" /> },
  { title: "Total Patients", value: "1,245", icon: <Users size={28} className="text-green-500" /> },
  { title: "Appointments", value: "325", icon: <Calendar size={28} className="text-yellow-500" /> },
  { title: "Revenue", value: "$50,230", icon: <DollarSign size={28} className="text-purple-500" /> },
];

const doctors = [
  { id: 1, name: "Dr. Amelia Carter", specialty: "Cardiologist", earned: "$12,500", reviews: "4.8 ⭐", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Robert Miller", specialty: "Neurologist", earned: "$15,320", reviews: "4.9 ⭐", image: "https://randomuser.me/api/portraits/men/32.jpg" },
];

const patients = [
  { id: 1, name: "John Doe", phone: "+1 987 654 3210", lastVisit: "2024-03-20", paid: "$200", image: "https://randomuser.me/api/portraits/men/30.jpg" },
  { id: 2, name: "Jane Smith", phone: "+1 876 543 2109", lastVisit: "2024-03-18", paid: "$150", image: "https://randomuser.me/api/portraits/women/35.jpg" },
];

const appointments = [
  { id: 1, doctor: "Dr. Amelia Carter", specialty: "Cardiologist", patient: "John Doe", time: "10:00 AM", status: "Completed", amount: "$200", doctorImage: doctors[0].image, patientImage: patients[0].image },
  { id: 2, doctor: "Dr. Robert Miller", specialty: "Neurologist", patient: "Jane Smith", time: "02:30 PM", status: "Pending", amount: "$150", doctorImage: doctors[1].image, patientImage: patients[1].image },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 flex items-center justify-between bg-white rounded-xl shadow-md">
            <div>
              <p className="text-gray-700 text-lg">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Revenue Chart & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl">
           <RevenueChart/>
        </div>
        <div className=" bg-white rounded-xl shadow-md">
          {/* <h2 className="text-xl font-semibold">Status Overview</h2> */}
          {/* <div className="space-y-4 mt-4">
            <p className="flex items-center gap-2 text-green-600"><CheckCircle size={20} /> 250 Completed</p>
            <p className="flex items-center gap-2 text-yellow-500"><Clock size={20} /> 50 Pending</p>
            <p className="flex items-center gap-2 text-red-500"><HeartPulse size={20} /> 25 Canceled</p>
          </div> */}
          <StatusChart/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Doctors List */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Doctors List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3">Specialty</th>
                <th className="p-3">Earned</th>
                <th className="p-3">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="border-b">
                  <td className="p-3 flex items-center gap-3">
                    <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full" />
                    {doctor.name}
                  </td>
                  <td className="p-3 text-center">{doctor.specialty}</td>
                  <td className="p-3 text-center">{doctor.earned}</td>
                  <td className="p-3 text-center">{doctor.reviews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Patients List */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patients List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Patient</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Last Visit</th>
                <th className="p-3">Paid</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b">
                  <td className="p-3 flex items-center gap-3">
                    <img src={patient.image} alt={patient.name} className="w-10 h-10 rounded-full" />
                    {patient.name}
                  </td>
                  <td className="p-3 text-center">{patient.phone}</td>
                  <td className="p-3 text-center">{patient.lastVisit}</td>
                  <td className="p-3 text-center">{patient.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Appointments List */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Appointments List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3">Specialty</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b">
                <td className="p-3">{appt.doctor}</td>
                <td className="p-3 text-center">{appt.specialty}</td>
                <td className="p-3 text-center">{appt.patient}</td>
                <td className="p-3 text-center">{appt.time}</td>
                <td className="p-3 text-center">{appt.status}</td>
                <td className="p-3 text-center">{appt.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
