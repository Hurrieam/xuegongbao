// 是否是数字类型
export const isDigit = (digit: any): boolean => {
    return digit != undefined && (typeof digit === 'number' || !isNaN(Number(digit)));
};

// 转换数字
export const toDigit = (digit: any): number => {
    if (isDigit(digit)) {
        return Number(digit) > 0 ? Number(digit) : 0;
    }
    return 0;
};

// 是否是有效字符串
export const isBlank = (str: string): boolean => {
    return str.replace(/\s+/g, '').length === 0;
};

export const isAllNotBlank = (args: any[]): boolean => {
    return !args.some(arg => isBlank(arg));
}