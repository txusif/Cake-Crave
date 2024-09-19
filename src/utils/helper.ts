export const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
        currency: "INR",
    }).format(value);

};