/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://microsillons-app.vercel.app',
    generateRobotsTxt: true, // (optional)
    // ...other options
  }
  
  export default config