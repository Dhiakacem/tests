import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import List from "./pages/List/List";
import Search from "./pages/Search/Search";
import Details from "./pages/Details/Details";
import Rating from "./pages/Rating/Rating";
import Offer from "./pages/Offer/Offer";
import Carpooling from "./pages/Carpooling/Carpooling";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Profile/Edit" element={<Profile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/Search" element={<Search />} />
      <Route path="/Covoiturage" element={<List />} />
      <Route path="/Profile" element={<Details />} />
      <Route path="/Rating" element={<Rating />} />
      <Route path="/Offer" element={<Offer />} />
      <Route path="/Covoiturage/save" element={<Carpooling />} />
    </Routes>
  );
}

export default App;
