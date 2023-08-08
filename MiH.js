class MiH {
  constructor(cb) {
    this.container = [];
    this.cb = cb;
  }

  isEmpty() {
    return this.container.length === 0;
  }

  lessthan(parent, child) {
    return this.cb(parent) < this.cb(child);
  }

  greaterthan(parent, child) {
    return this.cb(parent) > this.cb(child);
  }

  swap(first, second) {
    const temp = this.container[first];
    this.container[first] = this.container[second];
    this.container[second] = temp;
  }

  getParent(curr) {
    return Math.floor((curr - 1) / 2);
  }

  getLargestChild(i) {
    const size = this.container.length - 1;
    if (2 * i + 1 > size) {
      return -1;
    }

    let result = 2 * i + 1;

    if (
      2 * i + 2 <= size &&
      this.lessthan(this.container[2 * i + 2], this.container[2 * i + 1])
    ) {
      result = 2 * i + 2;
    }

    return result;
  }

  insert(value) {
    this.container.push(value);
    let curr = this.container.length - 1;
    let parent = this.getParent(curr);
    while (
      parent !== -1 &&
      this.greaterthan(this.container[parent], this.container[curr])
    ) {
      this.swap(parent, curr);
      curr = parent;
      parent = this.getParent(curr);
    }

    return this.container;
  }

  hpyTop(parent) {
    let child = this.getLargestChild(parent);

    while (
      child !== -1 &&
      this.greaterthan(this.container[parent], this.container[child])
    ) {
      this.swap(parent, child);
      parent = child;
      child = this.getLargestChild(parent);
    }
  }

  poll() {
    const size = this.container.length - 1;
    const result = this.container[0];
    this.container[0] = this.container[size];
    this.container.pop();
    this.hpyTop(0);
    return result;
  }

  build(arr) {
    this.container = arr;
    for (let index = Math.floor(arr.length / 2); index >= 0; index--) {
      this.hpyTop(index);
    }
  }
}

const m = new MiH((obj) => obj.id);

m.build([
  { id: 11, name: "aa", age: 100, emp_id: 1000 },
  { id: 32, name: "bb", age: 20, emp_id: 2000 },
  { id: 33, name: "cc", age: 50, emp_id: 500 },
  { id: 4, name: "dd", age: 80, emp_id: 60 },
  { id: 15, name: "ee", age: 70, emp_id: 160 },
  { id: 36, name: "ff", age: 30, emp_id: 2160 },
  { id: 17, name: "gg", age: 140, emp_id: 61210 },
  { id: 88, name: "hh", age: 240, emp_id: 6110 },
  { id: 19, name: "ii", age: 540, emp_id: 690 },
]);

// m.build([10, 20, 30, 40, 50, 60, 70, 80, 100]);

// m.insert({ id: 1, name: "aa", age: 100, emp_id: 1000 });
// m.insert({ id: 2, name: "bb", age: 20, emp_id: 2000 });
// m.insert({ id: 3, name: "cc", age: 50, emp_id: 500 }); // 20, 100, 50
// m.insert({ id: 4, name: "dd", age: 80, emp_id: 60 });
// m.insert({ id: 5, name: "ee", age: 70, emp_id: 160 });
// m.insert({ id: 6, name: "ff", age: 30, emp_id: 2160 });
// m.insert({ id: 7, name: "gg", age: 140, emp_id: 61210 });
// m.insert({ id: 8, name: "hh", age: 240, emp_id: 6110 });
// m.insert({ id: 9, name: "ii", age: 540, emp_id: 690 });

console.log(m.container);

// while (!m.isEmpty()) {
//   console.log(m.poll());
// }
