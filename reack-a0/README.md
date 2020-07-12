# 复制 reack-a0 文件夹
$ cp -rf reack-a0 reack-coolname

# 替换文件夹下的所有内容
$ search a0 and replace to coolname

# 重命名一个文件
$ mv src/react_a0_export.js src/react_coolname_export.js 

# install all modules
$ npm install


# windows 下需执行 npm run dist2
# npm install -g win-node-env
# npm install -g cross-env

# 新建项目
$ sudo npm install -g npx
$ sudo npm install -g create-react-app
$ npx create-react-app rock-reack
$ cd rock-reack && npm start 

# 新建一个 A0 组件
index.js A0.js

# 启动
npm start

# 打包(生成 dist 文件夹)
$ npm install && npm run dist

# 发布 npmjs.org (发布前自增 package.json 里的版本号)
npm publish

# 撤销发布
$ npm unpublish test@1.1.0

# 发布到 npm 私服 (发布前自增 package.json 里的版本号)
....

# 项目引用 
import { A0 } from 'reack-a0';

# 使用
<A0>a0</A0>

# 启动本地服务
$ npm run start

# 本地构建(生成 build 文件夹)
$ npm run build

# ENOSPC: System limit for number of file watchers reached
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# 查看最新版本
npm info reack-a0 version

# 淘宝 npmjs 代理
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

### Analyzing the Bundle Size
npm install --save source-map-explorer
yarn add source-map-explorer

npm run build
npm run analyze

### 一个基于React的Web工具组件库
https://blueprintjs.com/docs/

### React Examples
https://reactjsexample.com/


