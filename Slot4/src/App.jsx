import AppNavbar from "./components/AppNavbar";
import HeroSection from "./components/HeroSection";
import OrchidExplorer from "./components/OrchidExplorer";
import AppFooter from "./components/AppFooter";
import UserContext, { currentUser } from "./context/UserContext";
import { orchids } from "./data/orchids";

function App() {
  const totalOrchids = orchids.length;
  const specialCount = orchids.filter((o) => o.isSpecial).length;

  return (
    <UserContext.Provider value={currentUser}>
      <div className="d-flex flex-column min-vh-100 bg-dark text-white">
        <AppNavbar totalOrchids={totalOrchids} specialCount={specialCount} />
        <main className="flex-grow-1">
          <HeroSection totalCount={totalOrchids} specialCount={specialCount} />
          <OrchidExplorer orchids={orchids} />
        </main>
        <AppFooter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
