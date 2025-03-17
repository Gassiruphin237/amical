import React, { useState, useEffect } from "react";
import axios from "axios";

const Bible = () => {
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // ✅ Vérifie si le composant est monté

        const fetchVerse = async () => {
            try {
                const response = await axios.get("https://bible-api.com/data/web/random");
                const data = response.data;

                if (!data.random_verse || !data.random_verse.text) {
                    throw new Error("Aucun verset récupéré.");
                }

                const { book, chapter, verse: verseNumber, text } = data.random_verse;

                if (isMounted) { // ✅ Empêche l'affichage de plusieurs versets
                    setVerse({ book, chapter, verseNumber, text });
                    setLoading(false);
                }
            } catch (error) {
                console.error("Erreur lors du chargement du verset :", error);
                setLoading(false);
            }
        };

        fetchVerse();

        return () => { isMounted = false; }; // ✅ Nettoyage du useEffect

    }, []); // 👈 `useEffect` ne s'exécute qu'une seule fois au montage

    if (loading) {
        return <p>Chargement du verset...</p>;
    }

    return (
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", maxWidth: "500px", margin: "auto" }}>
            <h2>📖 Verse of the Day</h2>
            {verse ? (
                <>
                    <p><strong>{verse.book} {verse.chapter}:{verse.verseNumber}</strong></p>
                    <blockquote style={{ fontStyle: "italic", color: "#555" }}>{verse.text}</blockquote>
                </>
            ) : (
                <p>Unable to load the verse.</p>
            )}
        </div>
    );
};

export default Bible;
