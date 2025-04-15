import React, { useState } from 'react';
import API from '../../api';

import { Container, Form, Button, ListGroup } from 'react-bootstrap';

export default function DettesView() {
  const [membreId, setMembreId] = useState('');
  const [dettes, setDettes] = useState([]);

  const fetchDettes = async () => {
    const res = await API.get(`/membres/${membreId}/dettes`);
    setDettes(res.data);
  };

  return (
    <Container className="my-3">
      <h4>Consulter les dettes</h4>
      <Form className="d-flex gap-2" onSubmit={(e) => { e.preventDefault(); fetchDettes(); }}>
        <Form.Control
          type="number"
          placeholder="ID du membre"
          value={membreId}
          onChange={(e) => setMembreId(e.target.value)}
        />
        <Button variant="info" onClick={fetchDettes}>Voir</Button>
      </Form>

      {dettes.length > 0 && (
        <ListGroup className="mt-3">
          {dettes.map((d, i) => (
            <ListGroup.Item key={i}>
              <strong>{d.type}</strong> : {d.total} F
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

