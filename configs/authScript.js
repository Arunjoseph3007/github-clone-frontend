#!/usr/local/bin/node
const username = process.env.USER || "";
const password = process.env.PASS || "";
const uri = process.env.URI || "//";
const method = process.env.CONTEXT || "";
const owner = uri.split("/").at(1);
const repo = uri.split("/").at(2).slice(0, -4);

const authsearchParams = new URLSearchParams({
  username: username,
  password: password,
  operation: method,
  repo_name: repo,
  owner_name: owner,
});
// TODO get this from env
const authUrl = new URL(`http://django:8080/main/cli-auth/`);
authUrl.search = authsearchParams.toString();

const handleResp = (s) => {
  const granted = s == '"Access Granted"' || s == '"All accesses granted"';
  process.exit(granted ? 0 : 1);
};

fetch(authUrl)
  .then((res) => res.text())
  .then(handleResp)
  .catch((e) => process.exit(2));
