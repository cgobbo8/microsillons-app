import { SitemapStream, streamToPromise } from 'sitemap';

const SitemapProvider =  async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of posts
    const posts = [];

    // Create each URL row
    posts.forEach(post => {
      smStream.write({
        url: `/post/${post.slug}`,
        changefreq: 'daily',
        priority: 0.9
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    res.send(JSON.stringify(e))
  }

}


export default SitemapProvider;