/**
 * Format a backend-provided amount as Egyptian pounds using language-appropriate numerals.
 * @param {number} amount
 * @param {string} language
 * @returns {string}
 */
export function formatPrice(amount, language = 'en') {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new TypeError('Price amount must be a finite number')
  }

  const isArabic = language.toLowerCase().startsWith('ar')
  return new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-EG', {
    style: 'currency',
    currency: 'EGP',
    numberingSystem: isArabic ? 'arab' : 'latn',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
