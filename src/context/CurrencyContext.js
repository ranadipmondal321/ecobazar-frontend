import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

const rates = {
    USD: { symbol: "$", rate: 1, label: "USD" },
    INR: { symbol: "₹", rate: 83.5, label: "INR" },
};

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState("USD");

    const convert = (usdPrice) => {
        if (!usdPrice) return `${rates[currency].symbol}0`;
        const converted = usdPrice * rates[currency].rate;
        return `${rates[currency].symbol}${converted.toFixed(currency === "INR" ? 0 : 2)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convert, rates }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    return useContext(CurrencyContext);
}