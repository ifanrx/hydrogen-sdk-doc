#!/usr/bin/env bash

# https://jira.corp.ifanr.com/browse/BAAS-6949
# 替换 gitbook-plugin-simpletabs 插件中引用的 maxcdn 为国内可访问的地址
sed -i 's,https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js,https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js,g' ./node_modules/gitbook-plugin-simpletabs/index.js
sed -i 's,https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css,https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css,g' ./node_modules/gitbook-plugin-simpletabs/index.js

gitbook serve --lrport 60032