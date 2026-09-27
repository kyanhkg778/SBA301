import { Row, Col } from "react-bootstrap";
import OrchidCard from "../../components/OrchidCard";
import { orchids } from "../../data/orchids";

function FavoritesPage() {
  const favoriteOrchids = orchids.filter((o) => o.isSpecial);

  return (
    <div>
      <h4 className="fw-bold text-warning mb-3">Favorite Orchids</h4>
      <Row xs={1} md={2} className="g-3">
        {favoriteOrchids.map((orchid) => (
          <Col key={orchid.id}>
            <OrchidCard orchid={orchid} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FavoritesPage;
