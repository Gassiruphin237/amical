import React, { useState } from 'react';
import API from '../../api';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import image from '../assets/user.png'
export default function MembreForm() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [lieu, setLieu] = useState('');
  const [dateArrivee, setDateArrivee] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cniPasseport, setCniPasseport] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('lieu', lieu);
      formData.append('dateArrivee', dateArrivee);
      if (photo) formData.append('photo', photo);
      if (cniPasseport) formData.append('cniPasseport', cniPasseport);

      await API.post('/membres', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Membre ajouté');
      setNom('');
      setPrenom('');
      setLieu('');
      setDateArrivee('');
      setPhoto(null);
      setCniPasseport(null);
    } catch (error) {
      alert("Erreur lors de l'ajout du membre");
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        {/* Image à gauche */}
        <Col md={5} className="mb-4 mb-md-0 text-center">
          <Image
            src={image}
            width={300}
            fluid
            rounded
          />
        </Col>

        {/* Formulaire à droite */}
        <Col md={7}>
          <h4 className="mb-4">Ajouter un membre</h4>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="mb-3">
              <Col>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Lieu de résidence</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lieu de résidence"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Date d'arrivée</Form.Label>
                <Form.Control
                  type="date"
                  value={dateArrivee}
                  onChange={(e) => setDateArrivee(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </Col>
              <Col>
                <Form.Label>CNI ou Passeport</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setCniPasseport(e.target.files[0])}
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
