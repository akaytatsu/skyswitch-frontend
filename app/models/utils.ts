export const removeAllUndefinedNodes = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(removeAllUndefinedNodes);
    }
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

export const convertData = (isoDate: any) => {

    if(!isoDate) return " - ";

    if(isoDate === "0001-01-01T00:00:00Z") return " - ";

    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0 em JavaScript
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }