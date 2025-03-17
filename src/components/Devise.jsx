import { useState, useEffect } from "react";
import "./Devise.css"
import axios from "axios";
import { TextField, Select, MenuItem, Box, InputAdornment } from "@mui/material";

const Devise = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("XAF");
  const [result, setResult] = useState("");
  const [rates, setRates] = useState({});

  const apiKey = "bd3094fa17727469f4f1460d94e3f651"; // Remplace par ta clé API valide

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://api.exchangeratesapi.io/v1/latest", {
          params: { access_key: apiKey }
        });

        setRates(response.data.rates);
      } catch (error) {
        console.error("Erreur lors de la récupération des taux :", error);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const conversionRate = rates[toCurrency] / rates[fromCurrency];
      setResult((amount * conversionRate).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const countryFlags = {
    USD: "us",
    EUR: "eu",
    GBP: "gb",
    XAF: "cm",
    CAD: "ca",
    JPY: "jp",
    CNY: "cn",
    NGN: "ng",
    INR: "in",
  };

  return (
    <div className="box">
<Box  sx={{ maxWidth: 600, margin: "auto", textAlign: "center", padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <h3>Convertisseur de Devise</h3>

      {/* Sélecteur de devise et montant */}
      <Box id="box" sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2 }}>
        <img src={`https://flagcdn.com/w40/${countryFlags[fromCurrency]}.png`} alt={fromCurrency} width="40" height="30" />
        <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} sx={{ flex: 1}}>
          {Object.keys(countryFlags).map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <TextField
        type="number"
        label="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">{fromCurrency}</InputAdornment>,
        }}
      />

      {/* Sélecteur de devise cible */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginTop: 3 }}>
        <img src={`https://flagcdn.com/w40/${countryFlags[toCurrency]}.png`} alt={toCurrency} width="40" height="30" />
        <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} sx={{ flex: 1 }}>
          {Object.keys(countryFlags).map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem> 
          ))}
        </Select>
      </Box>

      <TextField
        type="text"
        label="Résultat"
        value={result}
        fullWidth
        sx={{ marginTop: 2 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{toCurrency}</InputAdornment>,
          readOnly: true,
        }}
      />
    </Box>
    </div>
    
  );
};

export default Devise;
