const { table } = require('table');
const chalk = require('chalk');
const { pickTextColorBasedOnBgColorAdvanced } = require('./utils');

module.exports = formatDiffs;

function formatDiffs(labelDiff) {
  const missing = labelDiff.filter(label => label.type === 'missing');
  const changed = labelDiff.filter(label => label.type === 'changed');
  const added = labelDiff.filter(label => label.type === 'added');
  let missingTable = [];
  let changedTable = [];
  let addedTable = [];

  if (missing.length) missingTable.push(['✅  Missing labels', 'Will be created']);
  missing.map(miss => {
    missingTable.push([
      miss.expected.color
        ? chalk
            .bgHex(`#${miss.expected.color}`)
            .hex(pickTextColorBasedOnBgColorAdvanced(miss.expected.color))
            .bold(`  ${miss.expected.name}  `)
        : miss.expected.name,
      miss.expected.description
    ]);
  });
  if (changed.length) changedTable.push(['Ⓜ️  Existing label', 'New label']);
  changed.map(change => {
    changedTable.push([
      change.actual.color
        ? chalk
            .bgHex(`#${change.actual.color}`)
            .hex(pickTextColorBasedOnBgColorAdvanced(change.actual.color))
            .bold(`  ${change.actual.name}  `)
        : change.actual.name,
      change.expected.color
        ? chalk
            .bgHex(`#${change.expected.color}`)
            .hex(pickTextColorBasedOnBgColorAdvanced(change.expected.color))
            .bold(`  ${change.expected.name}  `)
        : change.expected.name
    ]);
  });
  if (added.length) addedTable.push(['❌  Added labels', 'Will be deleted']);
  added.map(add => {
    addedTable.push([
      add.actual.color
        ? chalk
            .bgHex(`#${add.actual.color}`)
            .hex(pickTextColorBasedOnBgColorAdvanced(add.actual.color))
            .bold(`  ${add.name}  `)
        : add.name,
      add.actual.description
    ]);
  });
  return [missingTable, changedTable, addedTable];
}
