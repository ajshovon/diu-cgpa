import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from 'path';

const nextConfig: NextConfig = {
  output: "standalone",
  // outputFileTracingRoot: path.join(__dirname),
  // transpilePackages: ["@diu-cgpa/types"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
