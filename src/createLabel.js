require('dotenv').config();
const { config } = require('./lib/config');
const fs = require('fs');
const createApiClient = require('./lib/api')();
const { table } = require('table');
const chalk = require('chalk');

const { pickTextColorBasedOnBgColorAdvanced } = require('./utils');

async function createLabel(args, newLabel) {
  const { GITHUB_USERNAME, GITHUB_REPO } = process.env;
  let user, repo;
  user = args.user || GITHUB_USERNAME;
  repo = args.repo || GITHUB_REPO;

  try {
    console.log(chalk.green(`Adding label to ${user}'s ${repo} repository...`));
    const result = await createApiClient.createLabel(user, repo, newLabel);
    let output = [['Label', 'Description']];
    console.log(chalk.green(`Label created!! 🎊`));
    output.push([
      chalk
        .bgHex(`#${result.color}`)
        .hex(pickTextColorBasedOnBgColorAdvanced(result.color))
        .bold(`  ${result.name}  `),
      result.description
    ]);
    const outputTable = table(output, config.tableConfig);
    console.log(outputTable);
  } catch (err) {
    return err;
  }
}

module.exports = createLabel;
