import { Container } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import UserList from "./components/UserList";
import AsyncTraceDemo from "./components/AsyncTraceDemo";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <AppNavbar />
      <Container className="flex-grow-1 py-4">
        <AsyncTraceDemo />
        <UserList />
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;
