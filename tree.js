class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  append(name) {
    const newNode = new Node(name);

    const children = this.children;
    children.push(newNode);
    return newNode;
  }

  toJSON() {
    return {
      value: this.name,
      label: this.name,
      children: this.children,
    };
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  createRoot(name) {
    this.root = new Node(name);
    return this.root;
  }

  preOrder() {
    const output = [];
    function helper(node) {
      if (node === null) {
        return null;
      }

      output.push(node.name);

      for (const child of node.children) {
        helper(child);
      }
    }

    helper(this.root);
    return output;
  }

  postOrder() {
    const output = [];
    function helper(node) {
      if (node === null) {
        return null;
      }

      for (const child of node.children) {
        helper(child);
      }

      output.push(node.name);
    }

    helper(this.root);
    return output;
  }
}

const t = new Tree();
const root = t.createRoot("root");

const aclGroup = root.append("acl-group");
const app = root.append("app");
const adminConfig = root.append("admin-config");
const captcha = root.append("captcha");

aclGroup.append("update");
aclGroup.append("getAll");
aclGroup.append("create");
aclGroup.append("get");
aclGroup.append("getRoleResource");
aclGroup.append("delete");

app.append("sendOtp");
app.append("create");
app.append("report");
app.append("matchOtp");
app.append("login");

adminConfig.append("saveConfig");
adminConfig.append("getAllConfig");

captcha.append("v2");
captcha.append("v3");

console.log(JSON.stringify(t, null, 2));
