import { useState, useEffect } from "react";
import { Card, Table, Button, Badge, Alert, Spinner, Row, Col, Form } from "react-bootstrap";
import { getUsersWithFetch, getUsersWithAxios } from "../services/userService";
import { cacheService } from "../services/cacheService";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState("axios"); // "fetch" or "axios"
  const [useCache, setUseCache] = useState(true);
  const [simulateError, setSimulateError] = useState(false);
  const [cacheStatus, setCacheStatus] = useState("IDLE");

  const CACHE_KEY = `users_data_${method}`;

  const loadData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // 1. Check TTL Cache first if enabled and not forced
    if (useCache && !forceRefresh) {
      const cached = cacheService.get(CACHE_KEY);
      if (cached) {
        setUsers(cached);
        setCacheStatus("CACHE_HIT (Loaded from memory)");
        setLoading(false);
        return;
      }
    }

    setCacheStatus("NETWORK_FETCH (Request sent)");
    const controller = new AbortController();

    try {
      const endpoint = simulateError
        ? "https://jsonplaceholder.typicode.com/invalid_404_url"
        : null;

      let data;
      if (method === "fetch") {
        data = await getUsersWithFetch(controller.signal, endpoint);
      } else {
        data = await getUsersWithAxios(controller.signal, endpoint);
      }

      setUsers(data);
      if (useCache) {
        cacheService.set(CACHE_KEY, data);
      }
    } catch (err) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        console.log("Request aborted intentionally.");
      } else {
        setError(err.message || "Failed to fetch user list from server.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [method]);

  const handleClearCache = () => {
    cacheService.clear();
    setCacheStatus("CACHE_CLEARED");
  };

  return (
    <Card bg="dark" text="white" className="p-4 border-secondary shadow-sm mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-info mb-0">User Data Directory</h4>
        <Badge bg={method === "axios" ? "info" : "warning"} text="dark" className="fs-6 px-3 py-2">
          Engine: {method.toUpperCase()}
        </Badge>
      </div>

      {/* Control Toolbar */}
      <Row className="g-3 align-items-center mb-4 bg-secondary p-3 rounded">
        <Col md={3}>
          <Form.Label className="small fw-semibold text-light mb-1">HTTP Client Library</Form.Label>
          <Form.Select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="bg-dark text-white border-secondary"
          >
            <option value="axios">Axios Client</option>
            <option value="fetch">Native Fetch API</option>
          </Form.Select>
        </Col>

        <Col md={3} className="pt-md-4">
          <Form.Check
            type="switch"
            id="cache-switch"
            label="Enable TTL Cache (15s)"
            checked={useCache}
            onChange={(e) => setUseCache(e.target.checked)}
            className="fw-semibold text-info"
          />
        </Col>

        <Col md={3} className="pt-md-4">
          <Form.Check
            type="switch"
            id="error-switch"
            label="Simulate 404 Error"
            checked={simulateError}
            onChange={(e) => setSimulateError(e.target.checked)}
            className="fw-semibold text-danger"
          />
        </Col>

        <Col md={3} className="d-flex justify-content-end pt-md-4 gap-2">
          <Button variant="outline-warning" size="sm" onClick={handleClearCache}>
            Clear Cache
          </Button>
          <Button variant="info" size="sm" className="fw-bold" onClick={() => loadData(true)}>
            🔄 Refetch
          </Button>
        </Col>
      </Row>

      {/* Cache status indicator */}
      <div className="mb-3 small text-muted">
        <strong>Cache State:</strong> <span className="text-warning">{cacheStatus}</span>
      </div>

      {/* UI State Machine Rendering */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="info" className="mb-2" />
          <p className="text-muted mb-0">Fetching user records from API...</p>
        </div>
      )}

      {error && !loading && (
        <Alert variant="danger" className="bg-danger text-white border-0">
          <Alert.Heading className="fw-bold">Request Failed</Alert.Heading>
          <p className="mb-2">{error}</p>
          <Button variant="outline-light" size="sm" onClick={() => loadData(true)}>
            Retry Request
          </Button>
        </Alert>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-muted py-4">No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <Table responsive hover variant="dark" className="align-middle mb-0">
          <thead>
            <tr className="text-info border-bottom border-secondary">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="fw-bold text-warning">#{user.id}</td>
                <td className="fw-bold text-white">{user.name}</td>
                <td className="text-info">{user.email}</td>
                <td>{user.company?.name || "N/A"}</td>
                <td>{user.address?.city || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default UserList;
