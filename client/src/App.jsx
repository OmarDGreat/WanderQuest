import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Itineraries from "./pages/Itineraries";
import CreateTrip from "./pages/CreateTrip";
import ItineraryDetails from "./pages/ItineraryDetails";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/itineraries"
            element={
              <ProtectedRoute>
                <Itineraries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-trip"
            element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
          <Route path="/itineraries/:id" element={<ItineraryDetails />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
