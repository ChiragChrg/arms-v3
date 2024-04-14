'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    CheckCircleIcon,
    FileIcon,
    Loader2Icon,
    LucideFileWarning,
    RotateCcwIcon,
    Trash2Icon,
    UploadCloudIcon,
} from 'lucide-react';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

const variants = {
    base: 'relative rounded-md p-4 w-96 max-w-[calc(100vw-1rem)] flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
    active: 'border-2',
    disabled:
        'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600',
    accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
    reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

export type FileState = {
    file: File;
    key: string; // used to identify the file in the progress callback
    progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number;
};

type InputProps = {
    className?: string;
    value?: FileState[];
    onChange?: (files: FileState[]) => void | Promise<void>;
    onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
    disabled?: boolean;
    dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
    setFileStates: React.Dispatch<React.SetStateAction<FileState[]>>;
    uploadFiles: () => void
    isUploadComplete: boolean;
    setIsUploadComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const ERROR_MESSAGES = {
    fileTooLarge(maxSize: number) {
        return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
    },
    fileInvalidType() {
        return 'Invalid file type.';
    },
    tooManyFiles(maxFiles: number) {
        return `You can only add ${maxFiles} file(s).`;
    },
    fileNotSupported() {
        return 'The file is not supported.';
    },
};

type Params = {
    instituteID: string,
    courseID: string,
    subjectID: string,
    unitID: string
}

const MultiFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { dropzoneOptions, value, className, disabled, onFilesAdded, onChange, setFileStates, uploadFiles, isUploadComplete, setIsUploadComplete },
        ref
    ) => {
        const [customError, setCustomError] = React.useState<string>();
        const [disableUploadButton, setDisableUploadButton] = React.useState<boolean>(false);
        const params = useParams<Params>()

        if (dropzoneOptions?.maxFiles && value?.length) {
            disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
        }
        // dropzone configuration
        const {
            getRootProps,
            getInputProps,
            fileRejections,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            disabled,
            onDrop: (acceptedFiles) => {
                const files = acceptedFiles;
                setCustomError(undefined);
                if (
                    dropzoneOptions?.maxFiles &&
                    (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
                ) {
                    setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
                    return;
                }
                if (files) {
                    const addedFiles = files.map<FileState>((file) => ({
                        file,
                        key: Math.random().toString(36).slice(2),
                        progress: 'PENDING',
                    }));
                    void onFilesAdded?.(addedFiles);
                    void onChange?.([...(value ?? []), ...addedFiles]);
                }
            },
            accept: {
                'application/pdf': ['.pdf'],
            },
            ...dropzoneOptions,
        });

        // styling
        const dropZoneClassName = React.useMemo(
            () =>
                twMerge(
                    variants.base,
                    isFocused && variants.active,
                    disabled && variants.disabled,
                    (isDragReject ?? fileRejections[0]) && variants.reject,
                    isDragAccept && variants.accept,
                    className,
                ).trim(),
            [
                isFocused,
                fileRejections,
                isDragAccept,
                isDragReject,
                disabled,
                className,
            ],
        );

        // error validation messages
        const errorMessage = React.useMemo(() => {
            if (fileRejections[0]) {
                const { errors } = fileRejections[0];
                if (errors[0]?.code === 'file-too-large') {
                    return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
                } else if (errors[0]?.code === 'file-invalid-type') {
                    return ERROR_MESSAGES.fileInvalidType();
                } else if (errors[0]?.code === 'too-many-files') {
                    return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
                } else {
                    return ERROR_MESSAGES.fileNotSupported();
                }
            }
            return undefined;
        }, [fileRejections, dropzoneOptions]);

        return (
            <div>
                <div className="flex flex-col gap-2">
                    <div>
                        {/* Main File Input */}
                        {value?.length === 0 ?
                            <div
                                {...getRootProps({
                                    className: dropZoneClassName,
                                })}>
                                <input ref={ref} {...getInputProps()} accept='.pdf' />
                                <div className="flex flex-col items-center gap-1 justify-center text-xs text-gray-500 dark:text-gray-400">
                                    <UploadCloudIcon className="mb-1 h-8 w-8" />
                                    <div className="text-gray-500 dark:text-gray-400 text-[1.2em]">
                                        <span className='hidden lg:block'>Drag & Drop or Click to upload PDF files</span>
                                        <span className='lg:hidden'>Click to upload PDF files</span>
                                    </div>
                                    <div className="text-gray-500/80 dark:text-gray-400/80">
                                        Max-Files: 10, Max-Size: 25MB, File-Type: PDF
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="flex justify-between items-center mt-4 sm:mx-3">
                                {/* Custom Upload & Reset Buttons */}
                                <div className="text-[1.25em]">
                                    {value?.length} files selected
                                </div>

                                <div className="flex items-center gap-2 sm:gap-4">
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setFileStates([]);
                                            setDisableUploadButton(false)
                                            setIsUploadComplete(false)
                                        }
                                        }
                                        className='flex_center gap-2 text-white'>
                                        <RotateCcwIcon />
                                        <span className='hidden sm:block'>Reset</span>
                                    </Button>

                                    {disableUploadButton ?
                                        <>
                                            {isUploadComplete ?
                                                <Link
                                                    href={`/institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}/${params?.unitID}`}
                                                    className='flex_center gap-2 bg-primary text-white w-[110px] h-10 px-4 py-2 rounded-md'>
                                                    <CheckCircleIcon />
                                                    <span>Done</span>
                                                </Link>
                                                :
                                                <Button disabled className='flex_center gap-2 bg-primary text-white w-[110px] h-10 px-4 py-2 rounded-md'>
                                                    <Loader2Icon className='animate-spin' />
                                                </Button>
                                            }
                                        </>

                                        :
                                        <Button
                                            onClick={() => {
                                                uploadFiles()
                                                setDisableUploadButton(true)
                                            }}
                                            className='flex_center gap-2 text-white'>
                                            <UploadCloudIcon />
                                            <span>Upload Files</span>
                                        </Button>
                                    }
                                </div>
                            </div>
                        }

                        {/* Error Text */}
                        <div className="mt-1 text-xs text-red-500">
                            {customError ?? errorMessage}
                        </div>
                    </div>

                    {/* Selected Files */}
                    <div
                        style={{ display: value ? "grid" : "hidden" }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:mx-3 mt-1">
                        {value?.map(({ file, progress }, i) => (
                            <div
                                key={i}
                                className="flex h-16 w-full max-w-[100vw] mx-auto flex-col justify-center rounded border border-gray-300 px-4 py-2"
                            >
                                <div className="flex items-center gap-2 text-gray-500 dark:text-white">
                                    <FileIcon size="30" className="shrink-0" />
                                    <div className="min-w-0 text-sm">
                                        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            {file.name}
                                        </div>
                                        <div className="text-xs text-gray-400 dark:text-gray-400">
                                            {formatFileSize(file.size)}
                                        </div>
                                    </div>
                                    <div className="grow" />
                                    <div className="flex w-12 justify-end text-xs">
                                        {progress === 'PENDING' ? (
                                            <button
                                                className="rounded-md p-1 transition-colors duration-200 hover:bg-red-200 dark:hover:bg-red-500/30"
                                                onClick={() => {
                                                    void onChange?.(
                                                        value.filter((_, index) => index !== i),
                                                    );
                                                }}
                                            >
                                                <Trash2Icon className="shrink-0 text-red-600" />
                                            </button>
                                        ) : progress === 'ERROR' ? (
                                            <LucideFileWarning className="shrink-0 text-red-600 dark:text-red-400" />
                                        ) : progress !== 'COMPLETE' ? (
                                            <div>{Math.round(progress)}%</div>
                                        ) : (
                                            <CheckCircleIcon className="shrink-0 text-green-600 dark:text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                {typeof progress === 'number' && (
                                    <div className="relative h-0">
                                        <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                                                style={{
                                                    width: progress ? `${progress}%` : '0%',
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
);
MultiFileDropzone.displayName = 'MultiFileDropzone';

function formatFileSize(bytes?: number) {
    if (!bytes) {
        return '0 Bytes';
    }
    bytes = Number(bytes);
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { MultiFileDropzone };