/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    // domains: ["localhost"],
    domains: ["https://microsillons-strapi.herokuapp.com", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
