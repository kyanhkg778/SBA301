import { Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-slate-900 text-white">
      <AppNavbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
