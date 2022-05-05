// 是否是数字类型
export const isDigit = (digit: any): boolean => {
    return digit != undefined && (typeof digit === 'number' || !isNaN(Number(digit)));
};

// 转换成有效数字
export const toValidDigit = (digit: any): number => {
    if (isDigit(digit)) {
        return Number(digit) > 0 ? Number(digit) : 0;
    }
    return 0;
};

// 是否是有效字符串
export const isValidString = (str: any): boolean => {
    return typeof str === 'string' && str.replace(/\s+/g, '').length > 0;
};