import React, { useState, useEffect } from "react";
import countriesData from "./countries.json";
import { Card, CardContent, Typography, TextField, Button, Stack, Alert, Fade } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";

const GAME_DURATION = 120; // 2 minutes in seconds

const Country = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [hiddenWord, setHiddenWord] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [message, setMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Nouvelle variable d'état pour la pause

    useEffect(() => {
        const country = countriesData[Math.floor(Math.random() * countriesData.length)].toUpperCase();
        setSelectedCountry(country);
        setHiddenWord(Array(country.length).fill("_").map((_, index) => country[index] === "-" ? "-" : "_"));
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver && !isPaused) { // Vérification de l'état de pause
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setMessage(`Temps écoulé ! Le pays était ${selectedCountry}.`);
            setGameOver(true);
        }
    }, [timeLeft, gameOver, isPaused]); // Dépendances mises à jour

    const resetGame = () => {
        window.location.reload();
    };

    const handleGuess = (event) => {
        event.preventDefault();
        if (gameOver) return;

        const letter = event.target.letter.value.toUpperCase();
        event.target.reset();

        if (!letter || guessedLetters.includes(letter)) return;

        setGuessedLetters([...guessedLetters, letter]);

        if (selectedCountry.includes(letter)) {
            const updatedHiddenWord = selectedCountry
                .split("")
                .map((char, index) => (guessedLetters.includes(char) || char === letter || char === "-" ? char : "_"));
            setHiddenWord(updatedHiddenWord);

            if (!updatedHiddenWord.includes("_")) {
                setMessage("Bravo ! Vous avez trouvé le pays !");
                setGameOver(true);
                setIsPaused(true); // Mettre en pause le chronomètre sans le réinitialiser
            }
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
        }}>
            <Analytics />
           
            <Typography variant="h6" color={timeLeft <= 10 ? "red" : "black"}>
                Temps restant : {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Typography>
            <Stack alignItems="center" justifyContent="center" spacing={2}>
                <Card sx={{ textAlign: "center", m: 2, p: 1 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Devinez le pays (Version 1.0)</Typography>
                        <Typography variant="h6" sx={{ letterSpacing: 2, fontWeight: "bold" }}>
                            {hiddenWord.join(" ")}
                        </Typography>
                        {!message && (
                            <form onSubmit={handleGuess} style={{ marginTop: 20 }}>
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    <TextField name="letter" variant="outlined" size="small" inputProps={{ maxLength: 1, style: { textAlign: "center" } }} required disabled={gameOver} />
                                    <Button type="submit" variant="contained" disabled={gameOver}>Deviner</Button>
                                </Stack>
                            </form>
                        )}
                        <Fade in={!!message}>
                            <Stack spacing={2} sx={{ mt: 2 }}>
                                <Alert severity={message.includes("Bravo") ? "success" : "error"}>
                                    {message}
                                </Alert>
                                <Button variant="contained" color="primary" onClick={resetGame}>
                                    Rejouer
                                </Button>
                            </Stack>
                        </Fade>
                    </CardContent>
                </Card>
            </Stack>
        </div>
    );
};

export default Country;
