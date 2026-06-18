/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Your existing images configuration
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "www.techsoftwebsolutions.com",
        port: "",
        pathname: "/techsoft/demo/cafe-beatz-back/public/uploads/**",
      },
    ],
  },
};

export default nextConfig;

//   // ADD THESE LINES to ignore build errors
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// module.exports = nextConfig;
