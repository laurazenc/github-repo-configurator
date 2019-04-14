require('dotenv').config();
const { config } = require('./lib/config');
const fs = require('fs');
const createApiClient = require('./lib/api')();
const { table } = require('table');
const chalk = require('chalk');
const diffLabels = require('./diffLabels');
const formatDiffs = require('./formatDiffs');

const { pickTextColorBasedOnBgColorAdvanced } = require('./utils');

async function importLabels(args, labelsFile) {
  const { GITHUB_USERNAME, GITHUB_REPO } = process.env;
  let user, repo, softRun, deleteExisting, fileLabels;
  user = args.user || GITHUB_USERNAME;
  repo = args.repo || GITHUB_REPO;
  softRun = args.softRun || false;
  deleteExisting = args.deleteExisting || false;

  fs.readFile(labelsFile, (err, data) => {
    if (err) throw err;
    fileLabels = JSON.parse(data);
  });

  const existingLabels = await createApiClient.getLabels(user, repo);

  const diffs = diffLabels(existingLabels, fileLabels).filter(diff => {
    return !softRun && diff.type === 'added' ? false : true;
  });

  const formatted = formatDiffs(diffs);

  formatted.map(format => console.log(table(format)));

  //         if (err) console.log(err);
  //         console.log(chalk.green(`Successfully written to ${repo}.json`));
  //       });

  //   try {
  //     console.log(chalk.green(`Getting labels from ${user}'s ${repo} repository...`));
  //     const result = await createApiClient.getLabels(user, repo);
  //     let output = [['Label', 'Description']];
  //     let data = [];
  //     result.map(res => {
  //       let labelData = {
  //         name: res.name,
  //         color: res.color
  //       };

  //       if (res.description) labelData.description = res.description;
  //       if (res.aliases) labelData.aliases = res.aliases;

  //       output.push([
  //         chalk
  //           .bgHex(`#${labelData.color}`)
  //           .hex(pickTextColorBasedOnBgColorAdvanced(labelData.color))
  //           .bold(`  ${labelData.name}  `),
  //         labelData.description
  //       ]);
  //       data.push(labelData);
  //     });
  //     const outputTable = table(output, config.tableConfig);
  //     console.log(outputTable);

  //     if (download) {
  //       fs.writeFile(`${repo}.json`, JSON.stringify(data), err => {
  //         if (err) console.log(err);
  //         console.log(chalk.green(`Successfully written to ${repo}.json`));
  //       });
  //     }
  //   } catch (err) {
  //     return err;
  //   }
}

module.exports = importLabels;
