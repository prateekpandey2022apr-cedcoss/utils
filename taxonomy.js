const Tree = require("./tree");
const { createReadStream } = require("fs");

const readableStream = createReadStream("./tx.txt");

const t = new Tree();
const root = t.createRoot("root");

let fileContents = "";
const mapping = {};

readableStream.on("data", (chunk) => {
  fileContents += chunk.toString();
});

readableStream.on("close", () => {
  lines = fileContents.split("\n");

  for (const line of lines) {
    const csv = line.split(" > ");

    for (let index = 0; index < csv.length; index++) {
      if (index === 0) {
        if (!mapping.hasOwnProperty(csv[index])) {
          const node = root.append(csv[index]);
          mapping[csv[index]] = node;
        }
      } else {
        const prevIndex = index - 1;
        const currRoot = mapping[csv[prevIndex]];
        if (!mapping.hasOwnProperty(csv[index])) {
          const node = currRoot.append(csv[index]);
          mapping[csv[index]] = node;
        }
      }
    }
  }

  //   console.log(JSON.stringify(root, null, 2));

  console.log(root.children);
  //   console.log(mapping["Pet Supplies"]);
  //   console.log(mapping["Animals & Pet Supplies"]);
  //   console.log(mapping["Clothing"]);
  //   console.log(mapping["Jewelry"]);
  //   console.log(mapping["Electronics"]);
});
