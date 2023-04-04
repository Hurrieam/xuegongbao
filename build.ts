import path from 'path';
import fs from 'fs';

/**
 * 根据资源的相对路径获取绝对路径(root path：build/)
 * @param relativePath 相对路径
 */
const getResourcePath = (relativePath: string) => {
    return path.resolve(__dirname, relativePath);
}

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
    const sourceStaticDirPath = getResourcePath('../static');
    const targetStaticDirPath = getResourcePath('./static');
    remakeDir(targetStaticDirPath);

    // 2. 将static目录复制到build目录下
    copyFiles(sourceStaticDirPath, targetStaticDirPath);

    // 3. 将Dockerfile文件复制到build目录下
    const sourceDockerfilePath = getResourcePath('../Dockerfile');
    const targetDockerfilePath = getResourcePath('./Dockerfile');
    fs.copyFileSync(sourceDockerfilePath, targetDockerfilePath)

    // 4. 将package.json文件复制到build目录下
    const sourcePackageJSONPath = getResourcePath('../package.json');
    const targetPackageJSONPath = getResourcePath('./package.json');
    fs.copyFileSync(sourcePackageJSONPath, targetPackageJSONPath)

    // 5. 将.env文件复制到build目录下
    const args = process.argv.splice(2);
    const targetEnvPath = getResourcePath('./.env');
    let sourceEnvPath = getResourcePath('../.env');
    if (args.length > 0 && args[0] === '--prod') {
        sourceEnvPath = getResourcePath('../.env-prod');
    }
    fs.copyFileSync(sourceEnvPath, targetEnvPath)
})();