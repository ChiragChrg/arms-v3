import { Schema, model, models } from "mongoose";

const DocsSchema = new Schema({
    instituteName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
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
            trim: true
        },
        courseDesc: {
            type: String,
            required: true,
            trim: true
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
                trim: true
            },
            subjectDesc: {
                type: String,
                required: true,
                trim: true
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
                    trim: true
                },
                unitDesc: {
                    type: String,
                    required: true,
                    trim: true
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
                        trim: true
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