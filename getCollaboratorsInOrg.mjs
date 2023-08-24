import fs from "fs/promises";
const BASE_URL = "https://api.github.com/";

const TOKEN = "github_token";

const headers = { Authorization: `Bearer ${TOKEN}` };

const ORG = "organization_name";

async function* getOrgRepos() {
  let page = 1;

  while (1) {
    console.log(`Fetching repos. Page: ${page}`);
    const url = `${BASE_URL}orgs/${ORG}/repos?type=all&per_page=100&page=${page}`;

    let res = await fetch(url, {
      headers,
    });

    const resHeaders = res.headers;
    res = await res.json();

    if (res.length === 0) {
      break;
    }

    yield res;
    page++;

    const remainingRequests = parseInt(resHeaders.get("x-ratelimit-remaining"));
    const resetTime = parseInt(resHeaders.get("x-ratelimit-reset") * 1000);

    if (remainingRequests === 0) {
      yield new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, resetTime - Date.now())
      );
    }
  }
}

async function* getRepoCollabs() {
  let page = 1;

  console.log(`Fetching collabs for: ${currentRepo.name}`);
  while (1) {
    console.log(`Page: ${page}`);
    const url = `${BASE_URL}repos/${ORG}/${currentRepo.name}/collaborators?per_page=100&page=${page}`;

    let res = await fetch(url, {
      headers,
    });

    const resHeaders = res.headers;
    res = await res.json();

    if (res.length === 0) {
      break;
    }

    yield {
      repo: currentRepo,
      collabs: res,
    };
    page++;

    const remainingRequests = parseInt(resHeaders.get("x-ratelimit-remaining"));
    const resetTime = parseInt(resHeaders.get("x-ratelimit-reset") * 1000);

    if (remainingRequests === 0) {
      yield new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, resetTime - Date.now())
      );
    }
  }
}

async function initOrgRepo() {
  const data = [];
  const gen = getOrgRepos();

  while (1) {
    const { value, done } = await gen.next();
    // console.log({ done });

    if (done) {
      break;
    }

    if (value instanceof Promise) {
      console.log("throttled");
      await value;
    }

    if (value?.length) {
      for (const repo of value) {
        data.push({ name: repo.name, url: repo.html_url });
      }
    }
  }

  return data;
}

async function initCollabs() {
  const data = {};
  data.repo = currentRepo;
  data.collaborators = [];

  const gen = getRepoCollabs();

  while (1) {
    const { value, done } = await gen.next();
    // console.log({ done });

    if (done) {
      break;
    }

    if (value instanceof Promise) {
      console.log("throttled");
      await value;
    }

    if (value) {
      // console.log(value);
      for (const collab of value.collabs) {
        data.collaborators.push(collab.login);
      }
    }
  }

  return data;
}

const orgRepo = await initOrgRepo();
console.log(orgRepo);

const collabs = [];
let currentRepo = "";

for (const repo of orgRepo) {
  currentRepo = repo;
  collabs.push(await initCollabs());
}

await fs.writeFile("collaborators.txt", JSON.stringify(collabs, null, 2));
