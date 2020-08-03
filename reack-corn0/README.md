#### dependencys
https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js
https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js
https://cdnjs.cloudflare.com/ajax/libs/immutable/3.7.6/immutable.min.js
https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min.js
https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js
https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.4.4/randomColor.min.js


# windows 下需执行 npm run dist2
# npm install -g win-node-env
# npm install -g cross-env

# 新建项目
$ sudo npm install -g npx
$ sudo npm install -g create-react-app
$ npx create-react-app rock-reack
$ cd rock-reack && npm start 

# 新建一个 Button 组件
index.js Button.js

# 启动
npm start

# 打包(生成 dist 文件夹)
npm run dist

# 优化(生成 build 文件夹)
npm run build

# 发布到 npmjs.org (发布前先执行 $ npm run dist)
npm publish

# ENOSPC: System limit for number of file watchers reached
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# 查看最新版本
npm info reack-button version


### Analyzing the Bundle Size
npm install --save source-map-explorer
# "analyze": "source-map-explorer 'build/static/js/*.js'",
yarn add source-map-explorer

npm run build
npm run analyze

