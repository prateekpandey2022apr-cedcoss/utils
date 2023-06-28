function cSetInterval(cb, delay) {
  let shouldWait = false;
  const params = [];

  const handler = (...args) => {
    if (shouldWait) {
      params.push(args);
      return;
    }
    console.log(new Date());
    cb(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
      if (params.length) {
        const nextParams = params.shift();
        handler(nextParams);
      }
    }, delay);
  };

  return handler;
}

function print(params) {
  console.log(`print() called with ${params}`);
}

const setInterval = cSetInterval(print, 5000);

setInterval(100);
setInterval(200);
setInterval(300);
setInterval(400);
setInterval(500);
setInterval(600);
setInterval(700);
setInterval(800);
