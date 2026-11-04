import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import các trang chức năng
import RoomsPage from './pages/RoomsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RoomBookingPage from './pages/RoomBookingPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import StaffRoomsPage from './pages/StaffRoomsPage';
import StaffCustomersPage from './pages/StaffCustomersPage';
import StaffBookingsPage from './pages/StaffBookingsPage';

function AppContent() {
  const { isAuthenticated, isStaff, isCustomer } = useAuth();
  const [activePage, setActivePage] = useState('rooms');
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  // Điều hướng và hiển thị trang tương ứng
  const renderPage = () => {
    switch (activePage) {
      case 'rooms':
        return (
          <RoomsPage
            setActivePage={setActivePage}
            onSelectRoomForBooking={(room) => setSelectedRoomForBooking(room)}
          />
        );

      case 'login':
        return <LoginPage setActivePage={setActivePage} />;

      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;

      case 'profile':
        if (!isAuthenticated) return <LoginPage setActivePage={setActivePage} />;
        return <ProfilePage />;

      case 'book':
        if (!isAuthenticated) return <LoginPage setActivePage={setActivePage} />;
        return (
          <RoomBookingPage
            preselectedRoom={selectedRoomForBooking}
            setActivePage={setActivePage}
          />
        );

      case 'my-bookings':
        if (!isAuthenticated || isStaff) return <RoomsPage setActivePage={setActivePage} />;
        return <BookingHistoryPage setActivePage={setActivePage} />;

      case 'staff-rooms':
        if (!isAuthenticated || !isStaff) return <RoomsPage setActivePage={setActivePage} />;
        return <StaffRoomsPage />;

      case 'staff-customers':
        if (!isAuthenticated || !isStaff) return <RoomsPage setActivePage={setActivePage} />;
        return <StaffCustomersPage />;

      case 'staff-bookings':
        if (!isAuthenticated || !isStaff) return <RoomsPage setActivePage={setActivePage} />;
        return <StaffBookingsPage setActivePage={setActivePage} />;

      default:
        return <RoomsPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

