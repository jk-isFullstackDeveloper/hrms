import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Trash2, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCalendar() {
    const [events, setEvents] = useState([
        { id: "1", title: "Doctor Visit", date: "2025-03-28", color: "#4F46E5" },
        { id: "2", title: "Health Checkup", date: "2025-03-30", color: "#10B981" },
    ]);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({ title: "", date: "", color: "#4F46E5" });
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
            color: info.event.backgroundColor || "#4F46E5",
        });
        setIsDrawerOpen(true);
    };

    const handleSave = () => {
        if (!newEvent.title.trim()) return alert("Event title is required!");

        if (selectedEvent) {
            setEvents(events.map((event) =>
                event.id === selectedEvent.id ? { ...event, title: newEvent.title, color: newEvent.color } : event
            ));
        } else {
            setEvents([...events, {
                id: String(Date.now()),
                title: newEvent.title,
                date: newEvent.date,
                color: newEvent.color,
            }]);
        }
        setIsDrawerOpen(false);
        setSelectedEvent(null);
    };

    const handleDelete = () => {
        setEvents(events.filter((event) => event.id !== selectedEvent.id));
        setIsDrawerOpen(false);
        setSelectedEvent(null);
    };

    return (
        <div className="p-6 bg-gradient-to-b from-gray-100 to-white rounded-xl   mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex  gap-2 items-center mb-4 border-b pb-2">
                    {[
                        { label: "Month", value: "dayGridMonth" },
                        { label: "Week", value: "timeGridWeek" },
                        { label: "Day", value: "timeGridDay" },
                        { label: "List", value: "listMonth" },
                    ].map(({ label, value }) => (
                        <button
                            key={label}
                            onClick={() => setCalendarView(value)}
                            className={`px-4 py-2 text-sm rounded-md transition ${calendarView === value ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => {
                        setNewEvent({ title: "", date: "", color: "#4F46E5" });
                        setSelectedEvent(null);
                        setIsDrawerOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                    <Plus size={18} /> Add Appointment
                </button>
            </div>



            {/* Calendar */}
            <div className="border rounded-xl shadow-md overflow-hidden bg-white p-4">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    initialView={calendarView}
                    key={calendarView} // ✅ Forces re-render on view change
                    events={events.map((event) => ({
                        ...event,
                        backgroundColor: event.color,
                        borderColor: event.color,
                    }))}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    editable
                    selectable
                    eventContent={(eventInfo) => (
                        <div className="custom-event">
                            <span className="event-dot" style={{ backgroundColor: eventInfo.event.backgroundColor }}></span>
                            <span className="event-title">{eventInfo.event.title}</span>
                        </div>
                    )}

                />
            </div>

            {/* Right Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed inset-y-0 right-0 w-96 bg-white/80 backdrop-blur-lg shadow-2xl border-l z-50 flex flex-col "
                    >
                        {/* Drawer Header */}
                        <div className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            <h3 className="text-lg font-semibold">{selectedEvent ? "Edit Appointment" : "Add Appointment"}</h3>
                            <button onClick={() => setIsDrawerOpen(false)} className="text-white hover:text-gray-200">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="p-6 flex-grow overflow-y-auto bg-white">
                            {/* Event Title Input */}
                            <label className="block text-gray-600 font-medium mb-1">Event Title</label>
                            <input
                                type="text"
                                placeholder="Enter event title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            />

                            {/* Event Date Input */}
                            <label className="block text-gray-600 font-medium mt-4 mb-1">Event Date</label>
                            <input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            />

                            {/* Event Color Picker */}
                            <label className="block text-gray-600 font-medium mt-4 mb-1">Event Color</label>
                            <input
                                type="color"
                                value={newEvent.color}
                                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                                className="w-full h-10 border rounded-lg p-1 cursor-pointer"
                            />
                        </div>


                        {/* Drawer Footer */}
                        <div className="p-4 flex justify-between bg-gray-100 border-t rounded-bl-2xl">
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                            >
                                {selectedEvent ? "Update" : "Add"}
                            </button>
                            {selectedEvent && (
                                <button
                                    onClick={handleDelete}
                                    className="py-2 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-all shadow-md"
                                >
                                    <Trash2 size={18} className="mr-2" /> Delete
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
