import { StorageKeys } from './types';

class Storage {
    public get(key: StorageKeys): string | null {
        return localStorage.getItem(key);
    }

    public set(key: StorageKeys, value: string): void {
        localStorage.setItem(key, value);
    }

    public remove(key: StorageKeys): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}

export const storage = new Storage();
