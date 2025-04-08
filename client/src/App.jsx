import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Itineraries from "./pages/Itineraries";
import CreateTrip from "./pages/CreateTrip";
import ItineraryDetails from "./pages/ItineraryDetails";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/itineraries",
        element: (
          <ProtectedRoute>
            <Itineraries />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-trip",
        element: (
          <ProtectedRoute>
            <CreateTrip />
          </ProtectedRoute>
        ),
      },
      {
        path: "/itineraries/:id",
        element: <ItineraryDetails />,
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
