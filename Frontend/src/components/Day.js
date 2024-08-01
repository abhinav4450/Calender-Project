import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const url = "https://calender-project-backend.onrender.com";
  const FrontUrl="https://calender-project-frontend.onrender.com";

// API to delete the selected event by id
  async function deleteEvent(id) {
    try {
      console.log("data", id);
      const response = await axios.delete(
        `${url}/deleteById/${id}`
      );

      const data = response.data[0];
      console.log("Deleted Event Data", data);
      window.location.reload();
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
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  }
// On page load (use effect)
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  useEffect(() => {
    fetchdata(day.format("DD-MM-YYYY"));
  }, [deleteEvent, fetchdata, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
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
        {selectedDay === day.format("DD-MM-YYYY") &&
          selectedEventData && (
            <div>
              <div className="mt-2 text-center">
                <p>{selectedEventData.eventTitle}</p>
                <p>
                  {selectedEventData.stime}:00 -{" "}
                  {selectedEventData.etime}:00
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
            </div>
          )}
      </div>
    </div>
  );
}
