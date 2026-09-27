import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

function AsyncTraceDemo() {
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const runExecutionDemo = () => {
    setLogs([]);
    addLog("1. Synchronous Execution Start (Call Stack)");

    setTimeout(() => {
      addLog("4. Macrotask Executed (setTimeout Callback)");
    }, 0);

    Promise.resolve().then(() => {
      addLog("3. Microtask Executed (Promise .then)");
    });

    addLog("2. Synchronous Execution End (Call Stack)");
  };

  return (
    <Card bg="dark" text="white" className="p-4 border-secondary shadow-sm mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-warning mb-0">
          ⚡ Event Loop & Execution Priority Inspector
        </h5>
        <Button variant="outline-warning" size="sm" onClick={runExecutionDemo}>
          Run Event Loop Trace
        </Button>
      </div>
      <p className="text-muted small">
        Demonstrates JavaScript single-threaded concurrency: Synchronous Call Stack vs Microtask Queue (Promises) vs Macrotask Queue (setTimeout).
      </p>

      {logs.length > 0 && (
        <div className="bg-black p-3 rounded font-monospace small text-light border border-secondary">
          {logs.map((log, idx) => (
            <div key={idx} className="mb-1">
              <Badge bg="secondary" className="me-2">{idx + 1}</Badge> {log}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default AsyncTraceDemo;
