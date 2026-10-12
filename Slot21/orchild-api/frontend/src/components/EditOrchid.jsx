import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrchid, getOrchid, updateOrchid } from "../services/orchidApi";

const emptyForm = {
  orchidName: "",
  natural: false,
  orchidDescription: "",
  orchidCategory: "",
  attractive: false,
  orchidURL: ""
};

export default function EditOrchid({ createMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!createMode && id) {
      setLoading(true);
      getOrchid(id)
        .then(r => setForm(r.data))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [createMode, id]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (createMode) await createOrchid(form);
      else await updateOrchid(id, form);
      navigate("/");
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
        <p className="mt-2 text-muted">Loading orchid details...</p>
      </div>
    );
  }

  return (
    <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <form onSubmit={submit}>
        <h2 className="mb-4">{createMode ? "Create Orchid" : "Edit Orchid"}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label fw-bold">Name <span className="text-danger">*</span></label>
          <input
            className="form-control"
            name="orchidName"
            value={form.orchidName ?? ""}
            onChange={change}
            required
            placeholder="e.g. Taichung Beauty"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Category</label>
          <input
            className="form-control"
            name="orchidCategory"
            value={form.orchidCategory ?? ""}
            onChange={change}
            placeholder="e.g. Cattleya"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="orchidDescription"
            value={form.orchidDescription ?? ""}
            onChange={change}
            placeholder="Enter description..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Image URL</label>
          <input
            className="form-control"
            name="orchidURL"
            value={form.orchidURL ?? ""}
            onChange={change}
            placeholder="https://example.com/orchid.jpg"
          />
        </div>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="natural"
            id="natural"
            checked={!!form.natural}
            onChange={change}
          />
          <label className="form-check-label" htmlFor="natural">Natural</label>
        </div>
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="attractive"
            id="attractive"
            checked={!!form.attractive}
            onChange={change}
          />
          <label className="form-check-label" htmlFor="attractive">Attractive</label>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success px-4" type="submit">Save</button>
          <button className="btn btn-secondary px-4" type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
