import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrchids, deleteOrchid } from "../services/orchidApi";

export default function ListOfOrchids() {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await getOrchids();
      setOrchids(response.data);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this orchid?")) return;
    try {
      await deleteOrchid(id);
      await loadData();
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading orchids...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Orchids</h2>
        <Link className="btn btn-primary" to="/orchids/new">+ Create Orchid</Link>
      </div>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Natural</th>
              <th>Attractive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orchids.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No orchids found. Click "Create Orchid" to add the first orchid!
                </td>
              </tr>
            ) : (
              orchids.map(o => (
                <tr key={o.orchidId}>
                  <td>{o.orchidId}</td>
                  <td>
                    {o.orchidURL ? (
                      <img
                        src={o.orchidURL}
                        alt={o.orchidName}
                        style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "6px" }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-muted small">No image</span>
                    )}
                  </td>
                  <td><strong>{o.orchidName}</strong></td>
                  <td><span className="badge bg-secondary">{o.orchidCategory || "N/A"}</span></td>
                  <td>
                    <span className={`badge ${o.natural ? "bg-success" : "bg-light text-secondary border"}`}>
                      {o.natural ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${o.attractive ? "bg-info text-dark" : "bg-light text-secondary border"}`}>
                      {o.attractive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <Link className="btn btn-sm btn-warning me-2" to={`/orchids/${o.orchidId}/edit`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(o.orchidId)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
