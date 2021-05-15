export { priceFormat } from './validations';
export { dateFormat } from './validations';
export const formatCurrency = value => `${value} €`;

export const sumPrices = tickets => (
  tickets.reduce((acum, ticket) => {
    const formatPrice = ticket.price.replace(',', '.');
    const result = acum + parseFloat(formatPrice);
    const roundValue = Math.round(result * 100) / 100;
    return roundValue;
  }, 0)
);
