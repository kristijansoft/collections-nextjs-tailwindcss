export const setCapitalForWords = (str: string) => {
  if (!str) return '';
  const arr = str.split(' ');

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const str2 = arr.join(' ');
  return str2;
};

/**
 * This function takes a number and convert to a defined locale currency format,
 * by default it uses 'es-US' as language and 'USD' as currency
 * @exportscurrencyFormatter
 * @param {Number} amountOrAmountInString
 * @param {String} currency
 * @returns {String} locale formatted currency amount
 */

export const currencyFormatter = (amountOrAmountInString, currency = 'USD') => {
  const options = {
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
  };

  const numberFormatter = new Intl.NumberFormat('en-US', options);

  return numberFormatter.format(amountOrAmountInString || 0);
};
