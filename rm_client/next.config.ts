import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Bundle Analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default {
  ...bundleAnalyzer,
  reactStrictMode: false,
  images: {
    domains: ["195.26.246.99", "http:/127.0.0.1:3333", "127.0.0.1"],
    // domains: ['213.136.73.230', 'http://213.136.73.230:8090', '127.0.0.1'],
  },
  webpack(config: {
    module: {
      rules: {
        test: RegExp;
        use: (
          | string
          | {
              loader: string;
              options: {
                publicPath: string;
                outputPath: string;
                name: string;
                esModule: boolean;
              };
            }
        )[];
      }[];
    };
  }) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/videos/",
            outputPath: "static/videos/",
            name: "[name].[ext]",
            esModule: false, // Ensure CommonJS compatibility
          },
        },
      ],
    });

    return config; // Return the modified config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3333/api/:path*", // Proxy to backend
      },
    ];
  },
  // Additional Next.js configuration can be added here if needed
};
