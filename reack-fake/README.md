
# windows 下需执行 npm run dist2
# npm install -g win-node-env
# npm install -g cross-env

# 新建项目
$ sudo npm install -g npx
$ sudo npm install -g create-react-app
$ npx create-react-app rock-reack
$ cd rock-reack && npm start 

# 新建一个 Lang 组件
index.js Lang.js

# 启动
npm start

# 打包(生成 dist 文件夹)
$ npm install && npm run dist

# 发布 npmjs.org (发布前自增 package.json 里的版本号)
npm publish

# 发布到 npm 私服 (发布前自增 package.json 里的版本号)
....


# 启动本地服务
$ npm run start

# 本地构建(生成 build 文件夹)
$ npm run build

# ENOSPC: System limit for number of file watchers reached
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# 查看最新版本
npm info reack-lang version
