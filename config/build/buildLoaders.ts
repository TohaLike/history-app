import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const tsxLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        mode: "local",
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
        exportLocalsConvention: "asIs",
      },
      importLoaders: 1,
      esModule: false,
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      "sass-loader",
    ],
  };

  const imgLoader = {
    test: /\.(png|jpg|gif|svg)$/,
    type: "asset/resource",
  };

  return [imgLoader, scssLoader, tsxLoader];
}
