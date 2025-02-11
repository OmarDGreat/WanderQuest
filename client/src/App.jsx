import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Itineraries from "./pages/Itineraries";
import CreateTrip from "./pages/CreateTrip";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/create-trip" element={<CreateTrip />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
