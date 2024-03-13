const { resolve } = require('node:path');
const { addUIDependency, addServerDependency, runPreRequisiteChecks } = require('@genesislcap/seed-utils');
const checks = require('./checks');
const versions = require('./versions.json');
const packageJson = require('./package.json');

module.exports = async (data, utils) => {
    const { editJSONFile } = utils;
    const json = editJSONFile(packageJson);
    data.pbcVersion = json.get('version');
    data.date = Date();
    data.utils = utils;
    data.versions = versions;
    /**
     * Run checks on project
     */
    runPreRequisiteChecks(data, checks);

    addUIDependency(data, '@genesislcap/pbc-{{appName}}-ui', versions.dependencies['{{appName}}ClientVersion']);

    addServerDependency(data, {name: '{{appName}}'}, versions.dependencies['{{appName}}ServerVersion']);
};
