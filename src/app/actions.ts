"use server"
import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import UserModel from "@/models/UserModel";
import { DataStoreTypes } from "@/types/dataStoreTypes";

export async function getDashCount() {
    try {
        await connectDB();
        const DocsDB = await DocsModel.find({});

        const counts = {
            institute: DocsDB.length,
            course: 0,
            subject: 0,
            document: 0,
        };

        DocsDB.forEach((obj: any) => {
            counts.course += obj.course.length;
            obj.course.forEach((itm: any) => {
                counts.subject += itm.subjects.length;
                itm.subjects.forEach((sub: any) => {
                    counts.document += sub.subjectDocs.length;
                });
            });
        });

        return counts
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch DashCount');
    }
}

export async function getAllInstitutions() {
    try {
        await connectDB();
        const DocsDB = await DocsModel.find({}, 'instituteName description');

        const data = JSON.parse(JSON.stringify(DocsDB)) //Converting to plain object

        return data as DataStoreTypes[]
    } catch (err) {
        console.error(err);
        return err
    }
}

export async function getInstitution(instituteName: string) {
    try {
        await connectDB();
        const Institute = await DocsModel.findOne({ instituteName: { '$regex': instituteName, $options: 'i' } })
            .populate({
                path: 'registeredBy',
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.courseCreator',
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.subjects.subjectCreator',
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.subjects.subjectDocs.docUploader',
                select: 'username email avatarImg',
            })

        const data = JSON.parse(JSON.stringify(Institute)) //Converting to plain object

        return data as DataStoreTypes
    } catch (err) {
        console.error(err);
        return err
    }
}