module.exports = {
  webpack: (config) => {
    config.externals.push("bun:sqlite");
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
