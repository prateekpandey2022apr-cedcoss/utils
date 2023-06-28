function throttle(cb, delay) {
  let wait = false;
  return (...args) => {
    if (wait) {
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
}

function print(message) {
  console.log(message);
}

const throttledPrint = throttle(print, 1000);

throttledPrint("message 1");
throttledPrint("message 2");
throttledPrint("message 3");
throttledPrint("message 3");
