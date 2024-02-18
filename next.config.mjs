/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // export to static html
  output: "export",
};

if (process.env.NODE_ENV === "production") {
  nextConfig.distDir = "dist";
}

export default nextConfig;
