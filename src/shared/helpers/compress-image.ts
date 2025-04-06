import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File) => {
    if (!file) return;

    const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error('Image Compression error', error);
        return file;
    }
};
