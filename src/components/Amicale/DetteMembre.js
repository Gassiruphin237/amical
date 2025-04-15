import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Container, Table } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DetteMembre() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/dettes/total-par-membre').then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Container className="my-4">
      <h4 className="mb-3">Total des dettes par membre</h4>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nom" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_dette" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Total Dette (F)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.membre_id}>
              <td>{m.nom}</td>
              <td>{m.prenom}</td>
              <td>{m.total_dette}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
