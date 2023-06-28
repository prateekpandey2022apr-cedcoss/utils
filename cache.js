class Cache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 10000) {
    const cached = this.cache.get(key);

    if (cached) {
      clearTimeout(cached.timeout);
    }

    const timeout = setTimeout(() => this.cache.delete(key), ttl);
    this.cache.set(key, { value, timeout });
    return Boolean(cached);
  }

  get(key) {
    return this.cache.get(key) ? this.cache.get(key).value : -1;
  }
}

const c = new Cache();
c.set("a", 1, 10000);
console.log(c);
