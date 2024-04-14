"use client"
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEdgeStore } from '@/lib/edgestore';
import { getInstitution } from '@/app/actions/DocsActions'
import useUserStore from '@/store/useUserStore'
import { DataStoreTypes } from '@/types/dataStoreTypes'
import axios from 'axios'

import { MultiFileDropzone, type FileState } from './FileDropZone'
import NavRoute from '@/components/NavRoutes'
import MobileHeader from '@/components/MobileHeader'
import OpenBookSVG from '@/assets/Icons/OpenBookSVG'
import BuildingSVG from '@/assets/Icons/BuildingSVG'
import BookStackSVG from '@/assets/Icons/BookStackSVG'
import { BookOpenTextIcon, User2Icon } from 'lucide-react'
import toast from 'react-hot-toast';

type Params = {
    instituteID: string,
    courseID: string,
    subjectID: string,
    unitID: string
}

type FileUploadRes = {
    docName: string,
    docSize: string,
    docLink: string,
    docUploader: string | null,
}

const UploadDocuments = () => {
    const { user } = useUserStore()
    const params = useParams<Params>()

    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
    const { edgestore } = useEdgeStore();
    const queryClient = useQueryClient()

    const { data: instituteData } = useQuery({
        queryKey: ['getInstitutebyName', params?.unitID, "document-upload"],
        queryFn: async () => {
            try {
                const instituteName = params?.instituteID?.replaceAll("-", " ");
                const res = await getInstitution(instituteName) as DataStoreTypes;
                return res;
            } catch (error) {
                console.error('Error fetching institutions:', error);
                throw new Error('Failed to fetch institutions data');
            }
        },
        initialData: () => {
            const init = queryClient.getQueryData(['getInstitutebyName', params?.unitID]) as DataStoreTypes
            return init
        },
        initialDataUpdatedAt: () => queryClient.getQueryState(['getInstitutebyName', params?.unitID])?.dataUpdatedAt,
    });

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    // Uploading File
    const uploadFiles = async () => {
        if (!user?.uid) return

        let uploadMeta: FileUploadRes[] = []

        await Promise.all(
            fileStates.map(async (fileState) => {
                try {
                    if (fileState.progress !== 'PENDING') return;

                    const res = await edgestore.publicFiles.upload({
                        file: fileState.file,
                        onProgressChange: async (progress) => {
                            updateFileProgress(fileState.key, progress);
                            if (progress === 100) {
                                // wait 1 second to set it to complete
                                // so that the user can see the progress bar
                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                updateFileProgress(fileState.key, 'COMPLETE');
                            }
                        },
                    });

                    uploadMeta.push({
                        docName: fileState.file.name,
                        docSize: res.size.toString(),
                        docLink: res.url,
                        docUploader: user?.uid
                    })
                } catch (err) {
                    updateFileProgress(fileState.key, 'ERROR');
                    toast.error("Error while uploading files")
                }
            }),
        );

        // Uploading File info to DB
        const courseInfo = instituteData?.course?.find(obj => obj?.courseName.toLowerCase().replaceAll(" ", "-") === params?.courseID.toLowerCase())
        const subjectInfo = courseInfo?.subjects?.find(obj => obj?.subjectName.toLowerCase().replaceAll(" ", "-") === params?.subjectID.toLowerCase())
        const unitInfo = subjectInfo?.units?.find(obj => obj?.unitName.toLowerCase().replaceAll(" ", "-") === params?.unitID.toLowerCase())

        try {
            const UploadRes = await axios.post("/api/post/upload-files", {
                instituteId: instituteData?._id,
                courseId: courseInfo?._id,
                subjectId: subjectInfo?._id,
                unitId: unitInfo?._id,
                uploaderId: user?.uid,
                FilesMeta: uploadMeta
            })

            if (UploadRes.status == 201) {
                setIsUploadComplete(true)
                toast.success("Files uploaded successfully!")
                await queryClient.invalidateQueries()
            }
        } catch (error) {
            setIsUploadComplete(true)
            console.error(error)
            toast.error("Failed to update Database")
        }
    }


    return (
        <section className='section_style'>
            <NavRoute routes={[
                "Institutions",
                `Institutions/${params?.instituteID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}/${params?.unitID}`,
                `Institutions/${params?.instituteID}/${params?.courseID}/${params?.subjectID}/${params?.unitID}/Create`
            ]} />
            <MobileHeader />

            <h1 className="text-[1.8em] sm:text-[2em] 2xl:text-[3em] font-medium my-2 text-center">
                Upload new <span className="text-primary">Documents</span>
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-3 2xl:gap-4 w-full sm:px-8 mt-6'>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Institution</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={params?.instituteID?.replaceAll("-", " ") || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <BuildingSVG size="24" className="absolute right-2 text-slate-400" />
                    </div>
                </label>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Course</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={params?.courseID?.replaceAll("-", " ") || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <BookStackSVG size="24" className="absolute right-2 text-slate-400" />
                    </div>
                </label>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Subject</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={params?.subjectID?.replaceAll("-", " ") || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <OpenBookSVG size="24" className="absolute right-2 text-slate-400" />
                    </div>
                </label>
                <label className="relative w-full">
                    <span className='text-[0.9em] bg-background/0 px-1'>Unit</span>

                    <div className="flex items-center border border-muted-foreground sm:focus-within:border-primary rounded p-1">
                        <input
                            type="text"
                            required={true}
                            defaultValue={params?.unitID?.replaceAll("-", " ") || ""}
                            disabled={true}
                            className='text-[1em] w-full bg-background/0 text-slate-400 px-2 capitalize py-1 border-none outline-none placeholder:text-secondary-foreground/70' />

                        <BookOpenTextIcon size={24} className="absolute right-2 text-slate-400" />
                    </div>
                </label>
            </div>

            <div className="w-full h-[2px] bg-input mt-4"></div>

            <MultiFileDropzone
                className='w-full h-[380px] mt-10'
                value={fileStates}
                onChange={(files) => {
                    setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                }}
                setFileStates={setFileStates} //to reset the state
                uploadFiles={uploadFiles}
                isUploadComplete={isUploadComplete}
                setIsUploadComplete={setIsUploadComplete}
                dropzoneOptions={{
                    maxFiles: 10,
                    maxSize: 26214400
                }}
            />
        </section>
    )
}

export default UploadDocuments