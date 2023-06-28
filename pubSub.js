class PubSub {
  constructor() {
    this.data = {};
  }

  subscribe(event, cb) {
    const key = this.data[event];
    if (!key) {
      this.data[event] = [cb];
    } else {
      this.data[event].push(cb);
    }
  }

  publish(event, data) {
    const key = this.data[event];
    if (!key) {
      return;
    }
    this.data[event].forEach((cb) => {
      cb(data);
    });
  }

  unsubscribe(event, callback) {
    const index = this.data[event].indexOf(callback);
    if (index === -1) {
      return false;
    }

    this.data[event].splice(index, 1);
    return true;
  }
}

const o = new PubSub();

const cb1 = (data) => {
  console.log("click 1");
  console.log(data);
};

o.subscribe("click", cb1);

const cb2 = (data) => {
  console.log("click 2");
  console.log(data);
};

o.subscribe("click", cb2);

// o.subscribe("data", (data) => {
//   console.log("cb 1");
//   console.log(data);
// });

// o.subscribe("data", (data) => {
//   console.log("cb 2");
//   console.log(data);
// });

// o.unsubscribe("click", cb2);
// o.unsubscribe("click", cb1);

o.publish("click", { message: "404 Not Found" });

// o.publish("click", { message: "404 Not Found" });
// o.publish("data", { message: "Data has arrived" });
