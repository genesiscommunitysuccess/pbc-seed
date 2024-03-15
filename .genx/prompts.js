const prompts = async (inquirer, prevAns) => {
    const {
        repoName = prevAns.repoName,
        pkgScope = prevAns.pkgScope
    } = await inquirer.prompt([
        {
            name: 'repoName',
            type: 'input',
            message: 'Repository Name',
            when: !prevAns.repoName
        },
        {
            name: 'pkgScope',
            type: 'input',
            message: 'Package Scope',
            default: '@genesislcap',
            when: !prevAns.pkgScope
        }
    ]);
    return {
        repoName,
        pkgScope
    };
};

module.exports = async (inquirer, prevAns = {}) => await prompts(inquirer, prevAns)