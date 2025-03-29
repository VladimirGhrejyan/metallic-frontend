import { redirect } from '@tanstack/react-router';
import { StorageKeys, storage } from '~shared/lib/storage';

export const ifTokenExists = () => {
    const token = storage.get(StorageKeys.ACCESS_TOKEN);
    if (token) {
        throw redirect({ to: '/' });
    }
};

export const ifTokenNoExist = () => {
    const token = storage.get(StorageKeys.ACCESS_TOKEN);
    if (!token) {
        throw redirect({ to: '/sign-in' });
    }
};
