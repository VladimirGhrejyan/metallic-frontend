export const calculateTotalPrice = (price: number, percent: number) => {
    return (price + (price * percent) / 100).toFixed(2);
};
