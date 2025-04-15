import React, { useState } from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';

const membresInitiaux = [
  { id: 1, nom: 'Doe', prenom: 'John', statut: 'non' },
  { id: 2, nom: 'Smith', prenom: 'Anna', statut: 'oui' },
  { id: 3, nom: 'Kouassi', prenom: 'Marc', statut: 'non' },
];

export default function CotisationForm() {
  const [membres, setMembres] = useState(membresInitiaux);
  const [recherche, setRecherche] = useState('');
  const [filtre, setFiltre] = useState('tous');

  const validerStatut = (id, statut) => {
    setMembres(prev =>
      prev.map(m =>
        m.id === id ? { ...m, statut } : m
      )
    );
  };

  const membresFiltres = membres.filter(membre => {
    const nomComplet = `${membre.nom} ${membre.prenom}`.toLowerCase();
    const correspond = nomComplet.includes(recherche.toLowerCase());
    const matchFiltre =
      filtre === 'tous' ||
      (filtre === 'oui' && membre.statut === 'oui') ||
      (filtre === 'non' && membre.statut === 'non');
    return correspond && matchFiltre;
  });

  return (
    <Container className="mt-4">
      <h4>Suivi des cotisations</h4>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Rechercher un membre..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
          >
            <option value="tous">Tous</option>
            <option value="oui">A cotisé</option>
            <option value="non">N’a pas cotisé</option>
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {membresFiltres.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">Aucun résultat</td>
            </tr>
          ) : (
            membresFiltres.map((membre, index) => (
              <tr key={membre.id}>
                <td>{index + 1}</td>
                <td>{membre.nom}</td>
                <td>{membre.prenom}</td>
                <td>
                  {membre.statut === 'oui' ? (
                    <span className="text-success">A cotisé</span>
                  ) : (
                    <span className="text-danger">N’a pas cotisé</span>
                  )}
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => validerStatut(membre.id, 'oui')}
                  >
                   <i class="bi bi-check-square-fill"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => validerStatut(membre.id, 'non')}
                  >
                         <i class="bi bi-patch-minus-fill"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}
