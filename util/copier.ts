import path from 'path';
import fs from 'fs';

/**
 * 删除目录
 * @param filePath
 */
const removeFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, {recursive: true});
    }
};

/**
 * 将sourcePath目录下的文库全部复制到targetPath目录下
 * @param sourcePath  源路径
 * @param targetPath  目标路径
 */
const copyFile = (sourcePath: string, targetPath: string) => {
    // 读取sourcePath目录下的文件列表
    const files = fs.readdirSync(sourcePath);
    files.forEach((file: string) => {
        const currentSourcePath = path.join(sourcePath, file);
        const currentTargetPath = path.join(targetPath, file);
        // 判断当前文件是否是目录
        if (fs.statSync(currentSourcePath).isDirectory()) {
            fs.mkdirSync(currentTargetPath);
            copyFile(currentSourcePath, currentTargetPath);

        } else {
            // 最终项目中排除ts文件
            if (!currentSourcePath.endsWith("ts")) {
                fs.copyFileSync(currentSourcePath, currentTargetPath);
            }
        }
    });
}

(() => {
    const sourcePath = path.resolve(__dirname, '../../static');
    const targetPath = path.resolve(__dirname, '../static');

    removeFile(targetPath);
    fs.mkdirSync(targetPath);
    copyFile(sourcePath, targetPath);
})();