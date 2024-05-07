/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_URL: process.env.MYSQL_URL,
  },
};
export default nextConfig;
