import React, { useState, useEffect } from "react";
import countriesData from "./countries.json";
import { Card, CardContent, Typography, TextField, Button, Stack, Alert, Fade } from "@mui/material";
import { Analytics } from "@vercel/analytics/react"

const MAX_ERRORS = 15;

const Country = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [hiddenWord, setHiddenWord] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [errors, setErrors] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Choisir un pays au hasard et remplacer les tirets par des underscores
        const country = countriesData[Math.floor(Math.random() * countriesData.length)].toUpperCase();
        setSelectedCountry(country);
        // Remplacer les tirets par des underscores dans le mot caché
        setHiddenWord(Array(country.length).fill("_").map((_, index) => country[index] === "-" ? "-" : "_"));
    }, []);

    const resetGame = () => {
        window.location.reload();
    };

    const handleGuess = (event) => {
        event.preventDefault();
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
            }
        } else {
            setErrors(errors + 1);
            if (errors + 1 >= MAX_ERRORS) {
                setMessage(`Perdu ! Le pays était ${selectedCountry}.`);
            }
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <Analytics />
            <Stack alignItems="center" justifyContent="center" spacing={2}>
                <Card sx={{ textAlign: "center", m: 2, p: 1 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Devinez le pays (Version 1.0)</Typography>
                        <Typography variant="h6" sx={{ letterSpacing: 2, fontWeight: "bold" }}>
                            {hiddenWord.join(" ")}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, color: 'red' }}>
                            Erreurs : {errors} / {MAX_ERRORS}
                        </Typography>
                        {!message && (
                            <form onSubmit={handleGuess} style={{ marginTop: 20 }}>
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    <TextField name="letter" variant="outlined" size="small" inputProps={{ maxLength: 1, style: { textAlign: "center" } }} required />
                                    <Button type="submit" variant="contained">Deviner</Button>
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
