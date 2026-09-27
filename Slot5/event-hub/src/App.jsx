import { useState } from "react";
import AppNavbar from "./components/AppNavbar";
import HeroSection from "./components/HeroSection";
import EventExplorer from "./components/EventExplorer";
import AppFooter from "./components/AppFooter";
import { events as initialEvents } from "./data/events";

function App() {
  const [events] = useState(initialEvents);
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

  const handleRegister = (eventId, registrationData) => {
    setRegisteredEvents((prev) => ({
      ...prev,
      [eventId]: registrationData
    }));
  };

  const handleUnregister = (eventId) => {
    setRegisteredEvents((prev) => {
      const copy = { ...prev };
      delete copy[eventId];
      return copy;
    });
  };

  const handleToggleBookmark = (eventId) => {
    setBookmarkedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const registeredCount = Object.keys(registeredEvents).length;
  const bookmarkedCount = bookmarkedEvents.length;

  return (
    <div className="d-flex flex-column min-vh-100 bg-slate-900 text-white">
      <AppNavbar
        registeredCount={registeredCount}
        bookmarkedCount={bookmarkedCount}
      />
      <main className="flex-grow-1">
        <HeroSection
          totalEvents={events.length}
          registeredCount={registeredCount}
          bookmarkedCount={bookmarkedCount}
        />
        <EventExplorer
          events={events}
          registeredEvents={registeredEvents}
          bookmarkedEvents={bookmarkedEvents}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
          onToggleBookmark={handleToggleBookmark}
        />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
