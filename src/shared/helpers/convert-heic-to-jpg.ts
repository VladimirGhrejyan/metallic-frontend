import heic2any from 'heic2any';

export const convertHeicToJpeg = async (file: File) => {
    try {
        const blob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8,
        });

        const convertedBlob = Array.isArray(blob) ? blob[0] : blob;

        return new File([convertedBlob], file.name.replace('.heic', '.jpg'), {
            type: 'image/jpeg',
        });
    } catch (error) {
        console.error('HEIC Conversion error:', error);
        return file;
    }
};
