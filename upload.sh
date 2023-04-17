tar -zcf xjtucc.tar.gz ./build
scp -r xjtucc.tar.gz root@onezol.com:/root/xgb/
rm -rf xjtucc.tar.gz

echo "\033[32m 上传成功 \033[0m"