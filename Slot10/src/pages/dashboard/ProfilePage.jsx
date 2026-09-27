import { Card } from "react-bootstrap";

function ProfilePage() {
  return (
    <div>
      <h4 className="fw-bold text-warning mb-3">Student Profile</h4>
      <Card bg="secondary" text="white" className="p-3 border-0">
        <p className="mb-2"><strong>Name:</strong> SBA301 Learner</p>
        <p className="mb-2"><strong>Student ID:</strong> SE1910</p>
        <p className="mb-2"><strong>Course:</strong> SBA301 - Front-end Web Development</p>
        <p className="mb-0"><strong>Role:</strong> SPA Architect</p>
      </Card>
    </div>
  );
}

export default ProfilePage;
