import path from 'path';
import fs from 'fs';

/**
 * 将sourcePath目录下的文库全部复制到targetPath目录下
 * @param sourcePath  源路径
 * @param targetPath  目标路径
 */
const copyFile = (sourcePath: string, targetPath: string) => {
    // 读取sourcePath目录下的文件列表
    const files = fs.readdirSync(sourcePath);
    files.forEach((file: string) => {
        // 获取当前文件的绝对路径
        const currentSourcePath = path.join(sourcePath, file);
        // 获取目标文件的绝对路径
        const currentTargetPath = path.join(targetPath, file);
        // 判断当前文件是否是目录
        if (fs.statSync(currentSourcePath).isDirectory()) {
            copyFile(currentSourcePath, currentTargetPath);
        } else {
            // 当前文件不是目录，则复制
            fs.copyFileSync(currentSourcePath, currentTargetPath);
        }
    });
}

(() => {
    const sourcePath = path.resolve(__dirname, '../../static');
    const targetPath = path.resolve(__dirname, '../static');
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }
    copyFile(sourcePath, targetPath);
})();