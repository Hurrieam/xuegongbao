# Description: 一键更新脚本
# Author: Lixm
# Date: 2023-04-17
# Usage: 将此脚本放在项目产物所在目录, 执行 ./upgrade.sh dev 或 ./upgrade.sh prod
# Tips: 需注意docker网络配置 与 数据库部署方式

clear
tar -zxf xjtucc.tar.gz && mv build xjtucc
if [[ $1 = "dev" ]]; then
    echo "正在更新开发环境，请稍后..."
    echo "停止容器: $(docker stop nodejs-xuegongbao-dev)"
    echo "删除容器: $(docker rm nodejs-xuegongbao-dev)"
    echo "删除镜像: $(docker rmi xuegongbao-dev:latest | grep "Deleted:" | awk '{print $2}')"
    docker build -t xuegongbao-dev:latest ./xjtucc/
    echo "镜像构建完成"
    res=$(docker run -d -p 3001:3000 --name nodejs-xuegongbao-dev --restart=always --network=1panel-network --link 1Panel-mysql-ygo5:mysql xuegongbao-dev:latest)
    echo "容器启动成功～～～"
    echo "容器ID: $res"
elif [[ $1 = "prod" ]]; then
    echo "正在更新生产环境，请稍后..."
    echo "停止容器: $(docker stop nodejs-xuegongbao-prod)"
    echo "删除容器: $(docker rm nodejs-xuegongbao-prod)"
    echo "删除镜像: $(docker rmi xuegongbao-prod:latest | grep "Deleted:" | awk '{print $2}')"
    docker build -t xuegongbao-prod:latest ./xjtucc/
    echo "镜像构建完成"
    res=$(docker run -d -p 3000:3000 --name nodejs-xuegongbao-prod --restart=always --network=1panel-network --link 1Panel-mysql-ygo5:mysql xuegongbao-prod:latest)
    echo "容器启动成功～～～"
    echo "容器ID: $res"
else
    echo "请输入环境参数: dev 或 prod"
fi
rm -rf xjtucc