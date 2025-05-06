import CloseIcon from '@mui/icons-material/Close';
import DownloadingIcon from '@mui/icons-material/Downloading';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2,
    IconButton,
    Typography,
} from '@mui/material';
import { FC, Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useBulkUpdateProductsMutation } from '~entities/product';

export const BulkUpdate: FC = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const [productsBulkUpdate, { isLoading }] = useBulkUpdateProductsMutation();

    const onModalClose = useCallback(() => {
        setModalIsOpen(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (acceptedFiles) => {
            setIsImageUploading(true);
            setFile(acceptedFiles[0]);
            setIsImageUploading(false);
        },
        accept: {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        multiple: false,
        disabled: isImageUploading || isLoading,
    });

    const deleteUploadedFile = () => {
        setFile(undefined);
    };

    const onModalSave = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file as Blob, (file as File).name);
            productsBulkUpdate({
                body: formData as unknown as { file?: Blob },
            })
                .unwrap()
                .then(() => onModalClose());
        }
    };

    return (
        <Fragment>
            <Button
                onClick={() => setModalIsOpen(true)}
                variant="outlined"
                sx={{ gap: 1, color: 'primary.main', borderRadius: 1 }}
            >
                <DownloadingIcon fontSize="medium" />
                <Typography variant="body1" fontWeight="bold">
                    Bulk Update
                </Typography>
            </Button>
            {modalIsOpen && (
                <Dialog open={modalIsOpen} onClose={onModalClose} maxWidth={'md'} fullWidth>
                    <DialogTitle
                        component={'div'}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Update Many Products
                        </Typography>
                        <IconButton onClick={onModalClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <Grid2 container spacing={2}>
                            <Grid2 size={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        width: '100%',
                                        height: 250,
                                    }}
                                >
                                    <Box
                                        {...getRootProps()}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px dashed',
                                            borderColor: 'divider',
                                            background: 'white',
                                            borderRadius: 1,
                                            p: 2,
                                            cursor: isLoading ? 'no-drop' : 'pointer',
                                            textAlign: 'center',
                                            flex: 1,
                                            height: 250,
                                            transition: '0.3s',
                                            '&:hover': {
                                                backgroundColor: 'background.default',
                                                borderColor: 'primary.main',
                                            },
                                            opacity: isImageUploading ? 0.5 : 1,
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        {isImageUploading ? (
                                            <CircularProgress color="inherit" size={30} />
                                        ) : (
                                            <Typography variant="h6" fontWeight="normal">
                                                {isDragActive
                                                    ? 'Drop the file here...'
                                                    : 'Click or drag file to this area to upload'}
                                            </Typography>
                                        )}
                                    </Box>
                                    {file && (
                                        <Box
                                            sx={{
                                                maxWidth: '50%',
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                position: 'relative',
                                                border: '2px',
                                                borderStyle: 'dashed',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                padding: 1,
                                                transition: '0.3s',
                                                ':hover': {
                                                    borderColor: 'primary.main',
                                                    backgroundColor: 'background.default',
                                                    '& .image-delete-button': {
                                                        visibility: 'visible',
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                gap={1}
                                                maxWidth="100%"
                                                overflow="hidden"
                                            >
                                                <InsertDriveFileIcon fontSize="large" />
                                                <Typography
                                                    variant="body1"
                                                    textAlign="center"
                                                    sx={{
                                                        px: 5,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '100%',
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'normal',
                                                    }}
                                                >
                                                    {file.name}
                                                </Typography>
                                            </Box>
                                            <IconButton
                                                className="image-delete-button"
                                                size="small"
                                                onClick={deleteUploadedFile}
                                                sx={{
                                                    position: 'absolute',
                                                    right: '5px',
                                                    top: '5px',
                                                    zIndex: 10,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    color: '#fff',
                                                    boxShadow: '0 0 4px rgba(0,0,0,0.5)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    },
                                                    visibility: 'hidden',
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </Grid2>
                        </Grid2>
                    </DialogContent>
                    <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onModalSave}
                            disabled={isLoading}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Fragment>
    );
};
