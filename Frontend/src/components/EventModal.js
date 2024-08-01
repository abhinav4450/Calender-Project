import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [listOfParticipants, setListOfParticipants] = useState(
    selectedEvent ? selectedEvent.listOfParticipants : ""
  );
  const [stime, setStime] = useState(selectedEvent ? selectedEvent.stime : "");
  const [etime, setEtime] = useState(selectedEvent ? selectedEvent.etime : "");
  const [notes, setNotes] = useState(selectedEvent ? selectedEvent.notes : "");
  const [duration, setDuration] = useState("");
  const url="https://calender-project-backend.onrender.com";

  useEffect(() => {
    if (stime && etime) {
      const start = parseInt(stime, 10);
      const end = parseInt(etime, 10);
      const diff = end - start;
      setDuration(diff > 0 ? `${diff} hour(s)` : "Invalid time range");
    }
  }, [stime, etime]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      eventTitle: title,
      description,
      listOfParticipants,
      stime,
      etime,
      duration,
      notes,
      date: daySelected.format("DD-MM-YYYY"),
    };

    try {
      const response = await axios.post(`${url}/eventCreation`, data);
      console.log(response);

      // Update the calendar event locally
      const calendarEvent = {
        ...data,
        id: selectedEvent ? selectedEvent.id : Date.now(),
        day: daySelected.valueOf(),
      };

      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }

      setShowEventModal(false);
    } catch (err) {
      console.log("pakad liya", err);
      alert("Something went wrong");
    }
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        className="bg-white rounded-lg shadow-2xl w-1/4"
        onSubmit={handleSubmit}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">drag_handle</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button type="button" onClick={() => setShowEventModal(false)}>
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
              value={title}
              required
              className="col-span-4 pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400 col-span-1">schedule</span>
            <p className="col-span-4">{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400 col-span-1">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400 col-span-1">people</span>
            <input
              type="text"
              name="listOfParticipants"
              placeholder="List of Participants"
              value={listOfParticipants}
              required
              className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setListOfParticipants(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400 col-span-1">access_time</span>
            <select
              name="stime"
              value={stime}
              required
              className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setStime(e.target.value)}
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
              value={etime}
              required
              className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setEtime(e.target.value)}
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
              value={duration}
              readOnly
              className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="material-icons-outlined text-gray-400 col-span-1">notes</span>
            <input
              type="text"
              name="notes"
              placeholder="Notes"
              value={notes}
              className="col-span-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
