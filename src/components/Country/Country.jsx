import React, { useState, useEffect } from "react";
import countriesData from "./countries.json";
import { Card, CardContent, Typography, TextField, Button, Stack, Alert, Fade } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";

const GAME_DURATION = 120; // 2 minutes in seconds

// ... existing code ...

const Country = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hiddenWord, setHiddenWord] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [message, setMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const countryData = countriesData.countries[Math.floor(Math.random() * countriesData.countries.length)];
        setSelectedCountry(countryData);
        const normalizedName = countryData.name.toUpperCase();
        setHiddenWord(
            normalizedName.split('').map(char => 
                char === '-' || char === ' ' ? char : '_'
            )
        );
        setGuessedLetters([]);
        setMessage("");
        setTimeLeft(GAME_DURATION);
        setGameOver(false);
        setIsPaused(false);
    };

    useEffect(() => {
        if (timeLeft > 0 && !gameOver && !isPaused) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setMessage(`Temps écoulé ! Le pays était ${selectedCountry.name}.`);
            setGameOver(true);
        }
    }, [timeLeft, gameOver, isPaused, selectedCountry]);

    const handleGuess = (event) => {
        event.preventDefault();
        if (gameOver) return;

        const letter = event.target.letter.value.toUpperCase();
        event.target.reset();

        if (!letter || guessedLetters.includes(letter)) return;

        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);

        const normalizedCountryName = selectedCountry.name.toUpperCase();
        if (normalizedCountryName.includes(letter)) {
            const newHiddenWord = normalizedCountryName
                .split('')
                .map((char) => {
                    if (newGuessedLetters.includes(char) || char === '-' || char === ' ') {
                        return char;
                    }
                    return '_';
                });
            
            setHiddenWord(newHiddenWord);

            if (!newHiddenWord.includes('_')) {
                setMessage("Bravo ! Vous avez trouvé le pays !");
                setGameOver(true);
                setIsPaused(true);
            }
        }
    };

    const resetGame = () => {
        startNewGame();
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
                        {!gameOver && (
                            <form onSubmit={handleGuess} style={{ marginTop: 20 }}>
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    <TextField 
                                        name="letter" 
                                        variant="outlined" 
                                        size="small" 
                                        inputProps={{ 
                                            maxLength: 1, 
                                            style: { textAlign: "center" },
                                             pattern: "[A-Za-zÀ-ÿ]"
                                        }} 
                                        required 
                                    />
                                    <Button type="submit" variant="contained">Deviner</Button>
                                </Stack>
                            </form>
                        )}
                        {message && (
                            <Fade in={true}>
                                <Stack spacing={2} sx={{ mt: 2 }}>
                                    <Alert severity={message.includes("Bravo") ? "success" : "error"}>
                                        {message}
                                    </Alert>
                                    {gameOver && selectedCountry && (
                                        <img 
                                            src={selectedCountry.flag} 
                                            alt={`Drapeau ${selectedCountry.name}`} 
                                            style={{ 
                                                width: "150px", 
                                                margin: "10px auto",
                                                display: "block"
                                            }} 
                                        />
                                    )}
                                    <Button variant="contained" color="primary" onClick={resetGame}>
                                        Rejouer
                                    </Button>
                                </Stack>
                            </Fade>
                        )}
                    </CardContent>
                </Card>
            </Stack>
        </div>
    );
};

export default Country;