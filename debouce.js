function debouce(func, timeout) {
  let id;

  return (...args) => {
    clearTimeout(id);

    id = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

function out(str) {
  console.log(`out() called ${str}`);
}

const debouncedOut = debouce(out, 1000);
debouncedOut(10);
debouncedOut(20);
debouncedOut(30);
debouncedOut(40);
