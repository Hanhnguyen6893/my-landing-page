/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Cảnh báo: Việc này cho phép public build lên production ngay cả khi dự án có lỗi ESLint.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Cảnh báo: Việc này cho phép public build lên production ngay cả khi dự án có lỗi TypeScript.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
