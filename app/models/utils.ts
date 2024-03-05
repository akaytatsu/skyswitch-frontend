export const removeAllUndefinedNodes = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(removeAllUndefinedNodes);
    }
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}