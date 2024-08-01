import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
export default function CalendarHeader() {
  const { isAuthenticated, user, logout } = useAuth0();

  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <>
      {!isAuthenticated && <Navigate to="/"></Navigate>}
      <header className="px-4 py-2 flex items-center justify-between">
        <div className="flex flex-row items-center">
          <img src={logo} alt="calendar" className="mr-6 w-32 h-12" />
          <h1 className="mr-10 text-xl text-gray-500 fond-bold">
            Calendar
          </h1>
          <button
            onClick={handleReset}
            className="border rounded py-2 px-4 mr-5 hover:bg-slate-200"
          >
            Today
          </button>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
          <h2 className="ml-4 text-xl text-gray-500 font-bold">
            {dayjs(new Date(dayjs().year(), monthIndex)).format(
              "MMMM YYYY"
            )}
          </h2>
        </div>
        <div className="flex flex-row items-center">
        {isAuthenticated && <h3 className="mr-12">
            <span className="font-bold">Signed in as: </span>
            {user.name} 
          </h3>}
          {!isAuthenticated ? (
            <Navigate to="/"></Navigate>
          ) : (
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
}
