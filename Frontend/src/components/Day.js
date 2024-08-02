import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const url = "https://calender-project-backend.onrender.com";

  // API to delete the selected event by id
  async function deleteEvent(id) {
    try {
      console.log("dayadadadada", id);
      const response = await axios.delete(`${url}/deleteById/${id}`);
      const data = response.data[0];
      console.log("Deleted Event Data", data);
      // Refetch the events for the day after deletion
      fetchdata(day.format("DD-MM-YYYY"));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  // to Get Event Data by particular day
  async function fetchdata(day) {
    try {
      console.log("day", day);
      const response = await axios.get(`${url}/getByDate/${day}`);
      const data = response.data[0];
      console.log("Getting Event Data", data);
      if (data) {
        setSelectedEventData(data);
        setSelectedDay(day);
      } else {
        setSelectedEventData(null);
        setSelectedDay(null);
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  }

  // On page load (use effect)
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  useEffect(() => {
    fetchdata(day.format("DD-MM-YYYY"));
  }, [day,fetchdata]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
        {selectedDay === day.format("DD-MM-YYYY") && selectedEventData && (
          <div>
            <div className="mt-2 text-center">
              <p>{selectedEventData.eventTitle}</p>
              <p>
                {selectedEventData.stime}:00 - {selectedEventData.etime}:00
              </p>
              <p>{selectedEventData.duration}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(selectedEventData._id);
              }}
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Delete
            </button>
                <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className="text-blue-700 hover:text-white border z-50 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
            >
              Show
            </button>
            {showDetails && (
              <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
              <form
                className="bg-white rounded-lg shadow-2xl w-1/4"              >
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                  <span className="material-icons-outlined text-gray-400">drag_handle</span>
                  <div>
                    <button type="button" onClick={() => setShowDetails(false)}>
                      <span className="material-icons-outlined text-gray-400">close</span>
                    </button>
                  </div>
                </header>
                <div className="p-3">
                  <div className="grid grid-cols-5 gap-y-7 items-end">
                    <div></div>
                    <input
                      type="text"
                      name="eventTitle"
                      placeholder="Event title"
                      value={selectedEventData.eventTitle}
                      readOnly
                      className="col-span-4 pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span className="material-icons-outlined text-gray-400 col-span-1">schedule</span>
                    <p className="col-span-4">{day.format("dddd, MMMM DD")}</p>
                    <span className="material-icons-outlined text-gray-400 col-span-1">segment</span>
                    <input
                      type="text"
                      name="description"
                      placeholder="Add a description"
                      value={selectedEventData.description}
                      readOnly
                      className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span className="material-icons-outlined text-gray-400 col-span-1">people</span>
                    <input
                      type="text"
                      name="listOfParticipants"
                      placeholder="List of Participants"
                      value={selectedEventData.listOfParticipants}
                      readOnly
                      className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span className="material-icons-outlined text-gray-400 col-span-1">access_time</span>
                    <select
                      name="stime"
                      value={selectedEventData.stime}
                      readOnly
                      className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i.toString().padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                    <span className="material-icons-outlined text-gray-400 col-span-1">access_time</span>
                    <select
                      name="etime"
                      value={selectedEventData.etime}
                      readOnly
                      className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i.toString().padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                    <span className="material-icons-outlined text-gray-400 col-span-1">timelapse</span>
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration"
                      value={selectedEventData.duration}
                      readOnly
                      className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span className="material-icons-outlined text-gray-400 col-span-1">notes</span>
                    <input
                      type="text"
                      name="notes"
                      placeholder="Notes"
                      value={selectedEventData.notes}
                      readOnly
                      className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                  </div>
                </div>
              </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
