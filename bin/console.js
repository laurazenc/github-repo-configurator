#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');
const getLabelsFromRepo = require('../src/getLabelsFromRepo');

var program = new commander.Command();

program
  .version(pkg.version, '-v, --version')
  .usage('[commands] [options]')
  .description('🖥  github-repo-configuration cli')
  .option(
    '-t, --token <token>',
    'set your github token (also settable with a GITHUB_ACCESS_TOKEN environment variable). This would be used for private repos',
    process.env.GITHUB_ACCESS_TOKEN
  )
  .option(
    '-l, --labels <path>',
    'the path or URL to look for the label configuration in. Default: labels.json',
    'labels.json'
  );
program
  .command('get-labels')
  .alias('gl')
  .description('Get labels from given repo')
  .option(
    '-u, --user <user>',
    'set github user (also settable with a GITHUB_USERNAME environment variable).',
    process.env.GITHUB_USERNAME
  )
  .option(
    '-r, --repo <repo>',
    'set github repo (also settable with a GITHUB_REPO environment variable).',
    process.env.GITHUB_REPO
  )
  .option('-d, --download', 'Download data locally')
  .on('option:user', function() {
    process.env.GITHUB_USERNAME = this.user;
  })
  .on('option:repo', function() {
    process.env.GITHUB_REPO = this.repo;
  })
  .on('option:token', function() {
    process.env.GITHUB_ACCESS_TOKEN = this.token;
  })
  .action(getLabelsFromRepo);
program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
