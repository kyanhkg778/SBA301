import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { OrchidsData } from '../shared/ListOfOrchids';
import OrchidCard from './OrchidCard';
import OrchidDetailModal from './OrchidDetailModal';

export default function Orchids() {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedOrchid(null);
  };

  return (
    <Container id="orchids" className="py-4">
      <h2 className="mb-3">Orchids List</h2>
      <Row>
        {OrchidsData.map((orchid) => (
          <Col xs={12} sm={6} lg={3} key={orchid.id} className="mb-4">
            <OrchidCard orchid={orchid} onDetail={handleShow} />
          </Col>
        ))}
      </Row>
      <OrchidDetailModal show={show} orchid={selectedOrchid} onClose={handleClose} />
    </Container>
  );
}
