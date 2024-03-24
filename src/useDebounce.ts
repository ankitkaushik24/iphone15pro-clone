const useDebounce = (ms) => {
  let timerId = null;

  if (timerId) {
    clearTimeout(timerId);
  }
  return (fn) => {
    timerId = setTimeout(fn, ms);
  };
};
const debounce = useDebounce(2000);

const printFour = () => {
  console.log("4");
  return 4;
};

debounce(printFour);
