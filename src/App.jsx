import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// 1. Corrected the path string by removing the unsafe space character
import DailyReads from "./pages/DailyReads"; 
import DonatedBooks from "./pages/DonatedBooks";
import Crossword from "./pages/Crossword";
import BookReviews from "./pages/BookReviews";

function Home() {
  return (
    <>
      <Hero />
      <NewArrivalsSlider />
      <LibraryServices />
      <CirculationPolicy />
      <DonatedBooks />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/events" element={<Events />} />
            
            {/* 2. Registered the daily reads interface endpoint */}
            <Route path="/daily-reads" element={<DailyReads />} />
            <Route path="/dailyreads" element={<Navigate to="/daily-reads" replace />} />
            <Route path="/crossword" element={<Crossword />} />
            <Route path="/book-reviews" element={<BookReviews />} />
            
            <Route path="/donate" element={<DonatedBooks />} />
            <Route path="/donated-books" element={<DonatedBooks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}