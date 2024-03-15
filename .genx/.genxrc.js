module.exports = {
    details: () => ({
        nextStepsMessage: `
Your app has been converted to a PBC successfully 🎉

IMPORTANT:

> Replace {{repoName}} with the name of your repository in the following files:
\`.github/workflows/build-project.yaml\` (line 11)
\`.github/workflows/release-web.yaml\` (line 18)

> Set \`bundleGeneratedClasses\` to \`false\` in server/gradle.properties

Now you can do the following:

> Go into the (web) client directory with \`cd client\`

> Install the PBC dependencies with \`npm run bootstrap\`

> Start the development server with \`npm run dev\`
`
    }),
    prompts: () => require('./prompts'),
    configure: () => require('./configure'),
};
