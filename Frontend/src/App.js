import "./App.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import CalenderPage from "./Pages/CalenderPage";
import Login from "./components/Login";

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login></Login>
    },
    {
      path: "/calender",
      element: <CalenderPage></CalenderPage>
    }])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
