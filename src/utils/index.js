export const normalizePrice = (price) => {
  const normalized =
    price
      .replace(/\s/g, '')
      .replace(/^[-+]/, '')
      .replace(/[.,](?=.*[.,])/g, '')
      .replace(',', '.');

  return parseFloat(normalized);
}
