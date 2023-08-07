class MaxHeap {
  constructor() {
    this.container = [];
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
      this.container[2 * i + 1] < this.container[2 * i + 2]
    ) {
      result = 2 * i + 2;
    }

    return result;
  }

  insert(value) {
    this.container.push(value);
    let curr = this.container.length - 1;
    let parent = this.getParent(curr);
    while (this.container[parent] < this.container[curr]) {
      this.swap(parent, curr);
      curr = parent;
      parent = this.getParent(curr);
    }

    return this.container;
  }

  hpyTop(parent) {
    let child = this.getLargestChild(parent);

    while (child !== -1 && this.container[parent] < this.container[child]) {
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

const m = new MaH();
m.build([10, 20, 30, 40, 50, 60, 70, 80, 100]);

// console.log(m.insert(10));
// console.log(m.insert(20));
// console.log(m.insert(30));
// console.log(m.insert(40));
// console.log(m.insert(50));
// console.log(m.insert(60));
// console.log(m.insert(70));
// console.log(m.insert(80));
// console.log(m.insert(100));

console.log(m.poll());
console.log(m.container);

console.log(m.poll());
console.log(m.container);

// console.log(m.poll());
// console.log(m.container);
