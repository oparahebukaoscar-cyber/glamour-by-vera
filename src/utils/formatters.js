export const formatPrice = (value) =>
  `₦${Number(value).toFixed(2)}`;

export const formatDate = (date) =>
  new Date(date).toLocaleDateString();