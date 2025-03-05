export function isPlainObject(o: any): boolean {
    let ctor: Function | undefined;
    let prot: Object | undefined;

    if (!isObject(o)) {
        return false;
    }

    ctor = o.constructor;
    if (ctor === undefined) {
        return true;
    }

    prot = ctor.prototype;
    if (!isObject(prot)) {
        return false;
    }

    if (!Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf')) {
        return false;
    }

    return true;
}

function isObject(o: any): boolean {
    return Object.prototype.toString.call(o) === '[object Object]';
}