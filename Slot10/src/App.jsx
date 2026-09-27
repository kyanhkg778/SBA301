import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import OrchidsPage from "./pages/OrchidsPage";
import OrchidDetailPage from "./pages/OrchidDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import FavoritesPage from "./pages/dashboard/FavoritesPage";
import ProfilePage from "./pages/dashboard/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="orchids" element={<OrchidsPage />} />
        <Route path="orchids/:id" element={<OrchidDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Dashboard Nested Routes */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Redirect Demo */}
        <Route path="home" element={<Navigate to="/" replace />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
