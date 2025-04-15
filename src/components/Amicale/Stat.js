import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Container, Table } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import image from '../assets/money.png'
function Stat() {
    const [membreId, setMembreId] = useState('');
    const [dettes, setDettes] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        API.get('/dettes/total-par-membre').then((res) => {
            setData(res.data);
        });
    }, []);

    const fetchDettes = async () => {
        const res = await API.get(`/membres/${membreId}/dettes`);
        setDettes(res.data);
    };
    const stats = [
        {
            title: 'Dettes',
            value: '15 000 F',
            icon: 'bi-journal-x',
            color: 'danger'
        },
        {
            title: 'Montant en caisse',
            value: '225 000 F',
            icon: 'bi-cash-stack',
            color: 'success'
        },
        {
            title: 'Utilisateurs',
            value: '25 membres',
            icon: 'bi-people-fill',
            color: 'primary'
        },
        {
            title: 'Autres',
            value: '3 prêts en cours',
            icon: 'bi-box-seam',
            color: 'warning'
        },
    ];

    return (
        <>
            <div className="row">
                {stats.map((stat, index) => (
                    <div className="col-md-6 col-xl-3 mb-4" key={index}>
                        <div className={`card border-${stat.color} shadow h-100`}>
                            <div className="card-body d-flex align-items-center">
                                <div className="me-3">
                                    <i className={`bi ${stat.icon} text-${stat.color} fs-1`}></i>
                                </div>
                                <div>
                                    <h6 className="text-uppercase mb-1">{stat.title}</h6>
                                    <h5 className="mb-0">{stat.value}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Container className="my-4 text-center">
                <h4 className="mb-3">Bienvenue sur le Tableau de Bord</h4>
                <img src={image} alt='img' width={300}/>
            </Container>
        </>
    );
}

export default Stat;
