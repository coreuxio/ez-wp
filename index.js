#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import fetch from "node-fetch";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    `I hear you need some help with WP installation? \n`,
  );
  await sleep(800);
  rainbowTitle.stop();
}

async function askProjectname() {
  const answer = await inquirer.prompt({
    name: "project_name",
    type: "input",
    message: "What is your project's name?",
    default() {
      return "sitename";
    },
  });
  return answer;
}

async function askProjectDomain(sitename) {
  const answer = await inquirer.prompt({
    name: "project_domain",
    type: "input",
    message: "How about your domain name?",
    default() {
      return `${sitename.project_name}.test`;
    },
  });
  return answer;
}

async function askWpVersion() {
  // TODO get Current versions of Wordpress avialable via API
  const answers = await inquirer.prompt({
    name: "wp_version",
    type: "list",
    message: "WP Version \n",
    choices: ["6.1 lts", "6.0", "5.9", "5.8"],
    default() {
      return "8.1 lts";
    },
  });
  return answers;
}

async function askPhpVersion() {
  const phpVersions = await getWordpressVersions();
  console.log(phpVersions);
  let arrayForOptions = phpVersions.map((v) => v.name.replace(" (tar.gz)", ""));
  // TODO get current PHP versions avilable via API
  const answers = await inquirer.prompt({
    name: "php_version",
    type: "list",
    message: "PHP Version \n",
    choices: arrayForOptions,
    default() {
      return arrayForOptions.at(-1);
    },
  });
  return answers;
}

async function getWordpressVersions() {
  let url = "https://www.php.net/releases/index.php?json";
  let settings = { method: "Get" };
  let lastVersions = [];
  let count = 0;
  const phpVersions = await fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
  const phpMajorVersion = Object.keys(phpVersions)
    .map((k) => parseInt(k))
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, 3);
  let versions = [];
  for (const index in phpVersions) {
    if (phpMajorVersion.includes(parseInt(index))) {
      versions.push(
        phpVersions[index].source.find((v) => v.filename.slice(-2) == "gz"),
      );
    }
  }
  return versions;
}

async function askHomesteadFileLocation() {
  const answers = await inquirer.prompt({
    name: "homestead_location",
    type: "input",
    message: "Homestead File Location \n",
    default() {
      return "~/Homestead/Homestead.yaml";
    },
  });
  return answers;
}

async function ez_wp() {
  let sitename;
  let domain;
  let php;
  let wp;
  let homesteadFileLocation;
  await welcome();
  sitename = await askProjectname();
  domain = await askProjectDomain(sitename);
  php = await askPhpVersion();
  wp = await askWpVersion();
  homesteadFileLocation = await askHomesteadFileLocation();
  sleep(600);
  console.log(sitename, domain, php, wp, homesteadFileLocation);
  // TODO create entry in homesteadFileLocations for sitename
  // TODO Add database entry
  // TODO Create WP sintallation folder with selected wp version
  // TODO Add sintename.test to your /etc/hosts file
  // TODO provisions vagrant from /Homestead.yaml locations
  // TODO Open default browser to http://sitename.test
}

ez_wp();
