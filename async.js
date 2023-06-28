function async(gen) {
  const iterator = gen();
  function handle(item) {
    if (item.done) {
      return;
    }
    const value = item.value;
    if (value instanceof Promise) {
      value
        .then((res) => res.json())
        .then((res) => handle(iterator.next(res)))
        .catch((err) => {
          console.log(err);
          iterator.throw(new Error(err));
        });
    }
  }

  try {
    handle(iterator.next());
  } catch (error) {
    console.log(error);
  }
}

async(function* () {
  try {
    const res1 = yield fetch("https://api.github.com/users/octocat");
    const res2 = yield fetch(
      "https://api.github.com/users/prateekpandey2022apr-cedcoss"
    );
    const res3 = yield fetch("https://api.github.com/users/keon1212");

    console.log(res1);
    console.log(res2);
    console.log(res3);
  } catch (error) {
    throw new Error(error);
  }
});
