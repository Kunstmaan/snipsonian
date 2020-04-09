enum STORAGE_TYPE {
    localStorage = 'localStorage',
    sessionStorage = 'sessionStorage',
}

export default STORAGE_TYPE;

export function isValidStorageType(storageType: string): boolean {
    return (Object.values(STORAGE_TYPE) as string[]).includes(storageType);
}
