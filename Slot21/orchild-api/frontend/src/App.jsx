import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ListOfOrchids from "./components/ListOfOrchids";
import EditOrchid from "./components/EditOrchid";

export default function App() {
  return (
    <div className="min-vh-100 bg-light">
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<ListOfOrchids />} />
          <Route path="/orchids/:id/edit" element={<EditOrchid />} />
          <Route path="/orchids/new" element={<EditOrchid createMode />} />
        </Routes>
      </main>
    </div>
  );
}
