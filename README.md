## 搭建 react+webpack 4 +babel 项目最佳实践

## 项目运行和构建

-   运行 npm run dev

## webpack4 配置

-   使用 pnpm 工具，安装运行依赖包，webpack@4 webpack-cli@3
-   安装开发依赖包，webpack-dev-server（作用：为 webpack 打包生成的静态资源文件，提供 Web 服务）、 html-webpack-plugin、clean-webpack-plugin

## React 和 Babel 的配置

-   .jsx 文件要转换成.js 文件以及 js ES6 语法的解析，都需要 babel-loader。React 配置的同时，还需要配置 babel 相关包
-   安装 react 运行依赖，react、react-dom
-   在 src 路径下 新建文件，App.jsx
-   在 main.js 文件中引入子组件 App
-   安装@babel/core 相关包 、babel-loader 以及：pnpm install @babel/core @babel/cli @babel/preset-env @babel/plugin-transform-runtime @babel/preset-react --save-dev
-   安装运行依赖@babel/ployfill、core-js@3。在 babel.config.js 中配置；['@babel/preset-env',{useBuiltIns:'usage',core-js:{version:3},targets:{chrome:'60',ie:'10',safari:'10'}}] useBuiltIns:'usage'声明按需加载，core-js targets 节点指定兼容到哪个版本
-   在 webpack.config.js 文件配置解析.jsx 文件的配置项
