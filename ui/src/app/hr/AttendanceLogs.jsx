import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Trash2, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AttendanceLogs() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Present",
      date: "2025-03-30",
      color: "#4F46E5", // Blue for present
      profile: {
        name: "Alice Sharma",
        role: "Frontend Developer",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
      },
    },
    {
      id: "2",
      title: "On Leave",
      date: "2025-03-30",
      color: "#F59E0B", // Yellow for leave
      profile: {
        name: "Rahul Verma",
        role: "Backend Developer",
        image: "https://randomuser.me/api/portraits/men/33.jpg",
      },
    },
    {
      id: "3",
      title: "Work From Home",
      date: "2025-04-01",
      color: "#10B981", // Green for WFH
      profile: {
        name: "Sneha Gupta",
        role: "HR Manager",
        image: "https://randomuser.me/api/portraits/women/36.jpg",
      },
    },
    {
      id: "4",
      title: "Present",
      date: "2025-04-12",
      color: "#4F46E5", // Blue for present
      profile: {
        name: "Ankit Mehta",
        role: "DevOps Engineer",
        image: "https://randomuser.me/api/portraits/men/21.jpg",
      },
    },
    {
      id: "5",
      title: "Remote Attendance",
      date: "2025-04-12",
      color: "#6366F1", // Indigo for remote
      profile: {
        name: "Neha Desai",
        role: "UI/UX Designer",
        image: "https://randomuser.me/api/portraits/women/25.jpg",
      },
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    color: "#4F46E5",
  });
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  const handleDateClick = (info) => {
    setNewEvent({ title: "", date: info.dateStr, color: "#4F46E5" });
    setSelectedEvent(null);
    setIsDrawerOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setNewEvent({
      title: info.event.title,
      date: info.event.startStr,
      color: info.event.backgroundColor,
    });
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (!newEvent.title.trim()) return alert("Event title is required!");
    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, title: newEvent.title, color: newEvent.color }
            : event
        )
      );
    } else {
      setEvents([
        ...events,
        {
          id: String(Date.now()),
          title: newEvent.title,
          date: newEvent.date,
          color: newEvent.color,
          profile: {
            name: "Neha Desai",
            role: "UI/UX Designer",
            image: "https://randomuser.me/api/portraits/women/25.jpg",
          },
        },
      ]);
    }
    setIsDrawerOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setIsDrawerOpen(false);
    setSelectedEvent(null);
  };

  function renderEventContent(eventInfo) {
    const profile = eventInfo.event.extendedProps.profile;

    return (
      <div className="relative group flex items-center px-2 py-1">
        {/* Profile Image */}
        {profile?.image && (
          <img
            src={profile.image}
            alt={profile.name}
            className="w-5 h-5 rounded-full mr-2"
          />
        )}

        {/* Title and Name */}
        <div>
          <div className="text-[10px] font-semibold text-white leading-none">
            {eventInfo.event.title}
          </div>
          {profile?.name && (
            <div className="text-[9px] text-gray-300 leading-none">
              {profile.name}
            </div>
          )}
        </div>

        {/* Right Side Tooltip with Left Arrow */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          <div className="relative bg-white text-black text-xs px-3 py-2 rounded-md shadow-xl w-40">
            <div className="font-semibold text-sm mb-1">
              {eventInfo.event.title}
            </div>
            <div className="text-xs text-gray-600">{profile?.name}</div>
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-xl max-w-6xl mx-auto">
      {/* Calendar */}
      <div className="border rounded-xl shadow-md overflow-hidden bg-white p-4">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView={calendarView}
          events={events.map((event) => ({
            ...event,
            backgroundColor: event.color,
            borderColor: event.color,
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable
          selectable
          eventContent={renderEventContent}
        />
      </div>

      {/* Right Sidebar Drawer */}

      {/* BACKDROP */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsDrawerOpen(null)}
        />
      )}

      {/* SIDEBAR DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isDrawerOpen && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-white text-2xl leading-none hover:text-red-200"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto text-sm text-gray-700 space-y-4 h-[calc(100%-8rem)]">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="flex gap-3 mt-2">
                  {["#4F46E5", "#10B981", "#F59E0B", "#EF4444","#e11d48"].map((color) => (
                    <div
                      key={color}
                      className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                        newEvent.color === color
                          ? "ring-4 ring-gray-800"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewEvent({ ...newEvent, color })}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t bg-indigo-50 text-xs text-gray-600 flex justify-between items-center">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition"
              >
                Close
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-indigo-700 transition"
              >
                {selectedEvent ? "Update" : "Add"}
              </button>
              {selectedEvent && (
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-rose-600 text-white text-xs rounded hover:bg-indigo-700 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
