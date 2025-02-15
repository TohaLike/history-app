import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";
// import { BuildMode, BuildPaths } from "./config/types/types";
import { buildWebpack } from "./config/build/buildWebpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface EnvVariables {
  mode: any;
  port: number;
}

export default (env: EnvVariables) => {
  const paths: any = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src/app", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
  });

  return config;
};
