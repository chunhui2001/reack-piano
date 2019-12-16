#!/usr/bin/env bash

# | grep -o -E "\.([0-9a-z]{8,32})\." 匹配特定模式字符串
# | sort | uniq 排序、去重复
# | sed 's/\.//g' 替换 .
# | tr '\n' '|' 拼接成一行并用 | 分割
# | rev | cut -c 2- | rev  移除最后一个 |
# | awk '{str = sprintf("(%s)", $1)} END {print str}' 拼接 ()
declare _hash=$(cat build/asset-manifest.json | grep -o -E "\.([0-9a-z]{8,32})\." | sort | uniq | sed 's/\.//g' | tr '\n' '|' | rev | cut -c 2- | rev | awk '{str = sprintf("(%s)", $1)} END {print str}')

if [[ -z "$_hash" ]]; then 
  echo '没找到 hash 内容'
  exit
fi

echo -e '待替还内容如下:\c'
echo ".$_hash."

### rename
# find ./build/static -type f | grep -E "\.[0-9a-z]{8}\." | rename "s/.[a-z0-9]{8}././g"                      # linux but mac not work
# brew install rename
find ./build/static -type f  | grep -E "\.[0-9a-z]{8,32}\." | awk '{system("rename s/.[a-z0-9]{8}././g "$0)}'     # compatible linux and mac 
tree ./build/

# 挪过去待替换, 在挪回原位
cat ./build/service-worker.js > ./build/static/service-worker.js
cat ./build/index.html > ./build/static/index.html
mv ./build/precache-manifest.*.js ./build/static/precache-manifest.js 2>/dev/null
mv ./build/asset-manifest.json ./build/static/asset-manifest.json

### replace hash contents
sed -i -E "s/.$_hash././g" build/static/css/*
sed -i -E "s/.$_hash././g" build/static/js/*
sed -i -E "s/.$_hash././g" build/static/*.js
sed -i -E "s/.$_hash././g" build/static/*.html
sed -i -E "s/.$_hash././g" build/static/*.json

mv ./build/static/service-worker.js ./build 
mv ./build/static/index.html ./build 
mv ./build/static/precache-manifest.js ./build 2>/dev/null
mv ./build/static/asset-manifest.json ./build 

declare _app_config_file=`pwd`/build

echo "[DONE] >>> 现在你可以将 $_app_config_file/* 路径下的所有内容复制到你的项目中 <<<"


# replace all 'test' with 'text' in each line
# sed 's/fe9bab18//g' file.txt
