import { Schema, model, models } from "mongoose";

const DocsSchema = new Schema({
    instituteName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    registeredBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    course: [{
        courseName: {
            type: String,
            required: true,
        },
        courseDesc: {
            type: String,
            required: true,
        },
        courseCreator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        subjects: [{
            subjectName: {
                type: String,
                required: true,
            },
            subjectDesc: {
                type: String,
                required: true,
            },
            subjectCreator: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            units: [{
                unitName: {
                    type: String,
                    required: true,
                },
                unitDesc: {
                    type: String,
                    required: true,
                },
                unitCreator: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                unitDocs: [{
                    docName: {
                        type: String,
                        required: true,
                    },
                    docSize: {
                        type: String,
                        required: true,
                    },
                    docLink: {
                        type: String,
                        required: true,
                    },
                    docCreated: {
                        type: Date,
                        default: Date.now,
                    },
                    docUploader: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true,
                    },
                }],
            }]
        }],
    }],
})

const DocsModel = models.Docs || model("Docs", DocsSchema)

export default DocsModel