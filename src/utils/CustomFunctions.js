// Common function - sort array by unique parameter.
export const sort_by = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    // eslint-disable-next-line no-sequences
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};
