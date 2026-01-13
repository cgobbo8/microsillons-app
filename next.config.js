/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost", "microsillons-strapi.herokuapp.com", "microsillons-strapi.fly.dev", "microsillons.fr", "admin.microsillons.fr", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
