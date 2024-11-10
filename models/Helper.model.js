import mongoose from "mongoose"
const { Schema, model } = mongoose

const helperSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    offeredItems: {
        microwave: { type: Number, default: 0 },
        fridge: { type: Number, default: 0 },
        mattress: { type: Number, default: 0 }
    },
})

export default model("Helper", helperSchema)