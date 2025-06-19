// List of currencies
const currencies = [
    "AED", "ARS", "AUD", "BGN", "BRL", "BSD", "CAD", "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "DOP", "EGP", "EUR",
    "FJD", "GBP", "GTQ", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "KZT", "MXN", "MYR", "NOK",
    "NZD", "PAB", "PEN", "PHP", "PKR", "PLN", "PYG", "RON", "RUB", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH",
    "USD", "UYU", "VND", "ZAR"
];

// Populate select elements
const fromCurrency = document.getElementById("from_currency");
const toCurrency = document.getElementById("to_currency");

currencies.forEach(curr => {
    const option1 = document.createElement("option");
    option1.value = option1.text = curr;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = option2.text = curr;
    toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

// Swap currencies
document.getElementById("exchange").addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

// Handle exchange button
document.getElementById("exchange_button").addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(document.getElementById("original-currency-amount").value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const converted = (amount * rate).toFixed(2);

            document.getElementById("exchange-rate").value = `1 ${from} = ${rate} ${to}`;
            document.getElementById("from").textContent = `${amount} ${from}`;
            document.getElementById("to").textContent = `${converted} ${to}`;
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            alert("Could not fetch exchange rate. Try again later.");
        });
});

// Quick Swap INR ⇄ USD
document.getElementById("quick-swap").addEventListener("click", () => {
    const from = fromCurrency.value;
    const isINRtoUSD = from === "INR";

    fromCurrency.value = isINRtoUSD ? "USD" : "INR";
    toCurrency.value = isINRtoUSD ? "INR" : "USD";

    document.getElementById("original-currency-amount").value = 1;

    // Trigger conversion automatically
    document.getElementById("exchange_button").click();
});
