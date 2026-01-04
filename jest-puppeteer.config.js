module.exports = {
  launch: {
    headless: process.env.CI === 'true' ? true : 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'npm start',
    port: 3000,
    launchTimeout: 10000,
    debug: true
  }
};