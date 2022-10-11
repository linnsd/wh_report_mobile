export const commaString = (string) => {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };