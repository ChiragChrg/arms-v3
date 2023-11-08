export interface docsType {
    docId: string,
    docName: string,
    docSize: string,
    docLink: string,
    docCreated: Date,
    docUploader: string,
}

export interface subjectType {
    subjectName: string,
    subjectDesc: string,
    subjectCreator: string,
    subjectDocs?: docsType[] | null,
}

export interface courseType {
    courseName: string,
    courseDesc: string,
    courseCreator: string,
    subjects?: subjectType[] | null,
}

export interface DataStoreTypes {
    collegeName: string,
    description: string,
    registeredBy: string,
    createdOn: Date,
    course?: courseType[] | null,
    _id?: string
    __v?: number,
}