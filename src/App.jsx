import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Faculty from "./pages/Faculty";
import NewArrivals from "./pages/NewArrivals";
import Events from "./pages/Events";
import Footer from "./components/Footer";
import CirculationPolicy from "./components/CirculationPolicy";
import NewArrivalsSlider from "./components/NewArrivalsSlider";
import LibraryServices from "./components/LibraryServices";

function Home() {
  return (
    <>
      <Hero />
      <NewArrivalsSlider />
      <LibraryServices />
      <CirculationPolicy />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
