import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export default function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    // static: path.resolve(__dirname, "build"),
    // compress: true,
    port: options.port ?? 3000,
    open: true,
    // hot: true,
    // historyApiFallback: true,
  };
}
