"use server"
import { connectDB } from "@/lib/database";
import DocsModel from "@/models/DocsModel";
import UserModel from "@/models/UserModel";
import { DataStoreTypes } from "@/types/dataStoreTypes";

export async function getDashCount() {
    try {
        await connectDB();
        const DocsDB = await DocsModel.find({});

        if (!DocsDB)
            throw new Error('Documents not found!');

        const counts = {
            institute: DocsDB.length,
            course: 0,
            subject: 0,
            document: 0,
        };

        DocsDB.forEach((obj: any) => {
            counts.course += obj.course.length;
            obj.course?.forEach((itm: any) => {
                counts.subject += itm.subjects.length;
                itm.subjects?.forEach((sub: any) => {
                    sub.units?.forEach((unit: any) => {
                        counts.document += unit.unitDocs.length;
                    })
                });
            });
        });

        return counts
    } catch (err) {
        console.error("Error : ", err || 'Failed to fetch DashCount');
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
                model: UserModel,
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.courseCreator',
                model: UserModel,
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.subjects.subjectCreator',
                model: UserModel,
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.subjects.units.unitCreator',
                model: UserModel,
                select: 'username email avatarImg',
            })
            .populate({
                path: 'course.subjects.units.unitDocs.docUploader',
                model: UserModel,
                select: 'username email avatarImg',
            })

        const data = JSON.parse(JSON.stringify(Institute)) //Converting to plain object

        return data as DataStoreTypes
    } catch (err) {
        console.error(err);
        return err
    }
}