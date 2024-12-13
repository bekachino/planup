export const formatPhoneNumber = (value) => {
  const numbersOnly = value.replace(/\D/g, '');

  if (numbersOnly.length <= 3) {
    return numbersOnly;
  } else if (numbersOnly.length <= 6) {
    return `(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(3)}`;
  } else {
    return `(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(3, 6)} ${numbersOnly.slice(6, 9)}`;
  }
};

export const clearFormatPhoneNumber = (value) =>
  `+996${value.replace(/[\s()-]/g, '')}`;
