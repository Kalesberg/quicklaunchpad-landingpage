/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "strapi.quicklaunchpad.io"
          },
        ]    
    }
};

export default nextConfig;
