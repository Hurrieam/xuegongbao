import path from 'path';
import fs from 'fs';

/**
 * 重置目录
 * @param dir 目录
 */
const remakeDir = (dir: string) => {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, {recursive: true});
    }
    fs.mkdirSync(dir);
};

/**
 * 将sourcePath目录下的文库全部复制到targetPath目录下
 * @param sourcePath  源路径
 * @param targetPath  目标路径
 */
const copyFiles = (sourcePath: string, targetPath: string) => {
    // 读取sourcePath目录下的文件列表
    const files = fs.readdirSync(sourcePath);
    files.forEach((file: string) => {
        const currentSourcePath = path.join(sourcePath, file);
        const currentTargetPath = path.join(targetPath, file);
        // 判断当前文件是否是目录
        if (fs.statSync(currentSourcePath).isDirectory()) {
            if (!currentSourcePath.endsWith("script")) { // 最终项目中排除ts文件
                fs.mkdirSync(currentTargetPath);
                copyFiles(currentSourcePath, currentTargetPath);
            }
        } else {
            fs.copyFileSync(currentSourcePath, currentTargetPath);
        }
    });
}

(() => {
    // 1. 重置build目录
    const sourceStaticDirPath = path.resolve(__dirname, '../static');
    const targetStaticDirPath = path.resolve(__dirname, './static');
    remakeDir(targetStaticDirPath);

    // 2. 将static目录复制到build目录下
    copyFiles(sourceStaticDirPath, targetStaticDirPath);

    // 3. 将Dockerfile文件复制到build目录下
    const sourceDockerfilePath = path.resolve(__dirname, '../Dockerfile');
    const targetDockerfilePath = path.resolve(__dirname, './Dockerfile');
    fs.copyFileSync(sourceDockerfilePath, targetDockerfilePath)

    // 4. 将package.json文件复制到build目录下
    const sourcePackageJSONPath = path.resolve(__dirname, '../package.json');
    const targetPackageJSONPath = path.resolve(__dirname, './package.json');
    fs.copyFileSync(sourcePackageJSONPath, targetPackageJSONPath)

    // 5. 将.env文件复制到build目录下
    const sourceEnvPath = path.resolve(__dirname, '../.env');
    const targetEnvPath = path.resolve(__dirname, './.env');
    fs.copyFileSync(sourceEnvPath, targetEnvPath)
})();