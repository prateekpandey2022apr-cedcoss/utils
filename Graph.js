class Node {
  constructor(name) {
    this.name = name;
    this.adjacents = new Set();
  }

  addAdjacent(node) {
    this.adjacents.add(node);
  }

  removeAdjacent(node) {
    this.adjacents.delete(node);
  }
}

class Graph {
  constructor(directed) {
    this.nodes = new Map();
    this.visited = {};
  }

  addVertex(name) {
    let node = this.nodes.get(name);
    if (!node) {
      node = new Node(name);
      this.nodes.set(name, node);
    }
    return node;
  }

  removeVertex(name) {
    const node = this.nodes.get(name);
    if (node) {
      this.nodes.delete(name);
    }

    return this;
  }

  addEdge(start, end) {
    const startNode = this.addVertex(start);
    const endNode = this.addVertex(end);

    startNode.addAdjacent(endNode);

    if (!this.directed) {
      endNode.addAdjacent(startNode);
    }
  }

  removeEdge(start, end) {
    const startNode = this.nodes.get(start);
    const endNode = this.nodes.get(end);
    if (startNode && endNode) {
      startNode.removeAdjacent(endNode);
    }
  }

  toString() {
    let result = "";
    for (const [key, node] of this.nodes) {
      result += `${key} -> `;
      for (const adj of node.adjacents) {
        result += `${adj.name}, `;
      }
      result += "\n";
    }

    return result;
  }

  clearVisited() {
    this.visited = {};
  }

  dfs(start) {
    const result = [];

    function helper(node) {
      this.visited[node.name] = true;
      result.push(node.name);
      for (const adj of node.adjacents) {
        if (!this.visited[adj.name]) {
          helper.call(this, adj);
        }
      }
    }

    helper.call(this, this.nodes.get(start));
    return result;
  }

  traverse(start, visited) {
    const result = [];

    function helper(node) {
      visited[node.name] = true;
      result.push(node.name);
      for (const adj of node.adjacents) {
        if (!visited[adj.name]) {
          helper(adj);
        }
      }
    }

    helper(this.nodes.get(start));
    return result;
  }

  findConnectComponents() {
    let count = 0;

    for (const [key, node] of this.nodes) {
      if (!this.visited[key]) {
        this.dfs(key);
        count++;
      }
    }

    return count;
  }
}

const g = new Graph();

g.addEdge("a", "b");
g.addEdge("c", "b");
g.addEdge("d", "c");
g.addEdge("d", "b");
g.addEdge("e", "g");
g.addEdge("y", "z");
// g.addEdge("y", "b");

// console.log(g.toString());
console.log(g.dfs("d"));
console.log(g.dfs("e"));
console.log(g.dfs("g"));

g.clearVisited();

console.log(g.findConnectComponents());
// console.log(g);
