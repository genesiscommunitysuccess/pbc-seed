module.exports = {
    details: () => ({
        nextStepsMessage: `
{{appName}} has been converted to a PBC successfully 🎉

> Go into the (web) client directory with \`cd client\`

> Install the PBC dependencies with \`npm run bootstrap\`

> Start the development server with \`npm run dev\`
`
    }),
    prompts: () => () => {},
    configure: () => require('./configure'),
};
