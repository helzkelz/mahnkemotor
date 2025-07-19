/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Firebase Hosting configuration
  basePath: '',
  assetPrefix: '',
  // Optimize for Firebase Hosting
  compress: true,
  // Handle JSX transpilation for shared packages
  transpilePackages: ['@monorepo/ui'],
  webpack: (config) => {
    // Handle JSX in shared packages
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: /packages\/ui/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    });
    return config;
  }
};
