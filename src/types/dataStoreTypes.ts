export interface docsType {
    docName: string,
    docSize: string,
    docLink: string,
    docCreated: Date,
    docUploader: {
        _id: string,
        username: string,
        email: string,
        avatarImg: string
    },
    _id: string
}

export interface subjectType {
    subjectName: string,
    subjectDesc: string,
    subjectCreator: {
        _id: string,
        username: string,
        email: string,
        avatarImg: string
    },
    subjectDocs?: docsType[] | null,
    _id?: string
}

export interface courseType {
    courseName: string,
    courseDesc: string,
    courseCreator: {
        _id: string,
        username: string,
        email: string,
        avatarImg: string
    },
    subjects?: subjectType[] | null,
    _id?: string
}

export interface DataStoreTypes {
    instituteName: string,
    description: string,
    registeredBy: {
        _id: string,
        username: string,
        email: string,
        avatarImg: string
    },
    createdOn: Date,
    course?: courseType[] | null,
    _id?: string
    __v?: number,
}