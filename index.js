#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

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
  // TODO get current PHP versions avilable via API
  const answers = await inquirer.prompt({
    name: "php_version",
    type: "list",
    message: "PHP Version \n",
    choices: ["8.1 lts", "7.4", "7.2", "7.0", "5.9"],
    default() {
      return "8.1 lts";
    },
  });
  return answers;
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
  sleep();
  console.log(sitename, domain, php, wp, homesteadFileLocation);
  // TODO create entry in homesteadFileLocations for sitename
  // TODO Add database entry
  // TODO Create WP sintallation folder with selected wp version
  // TODO Add sintename.test to your /etc/hosts file
  // TODO provisions vagrant from /Homestead.yaml locations
  // TODO Open default browser to http://sitename.test
}

ez_wp();
