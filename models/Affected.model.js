import mongoose from "mongoose"
import { isWithinBoundaries } from '../helpers/locationValidator.js'
const { Schema, model } = mongoose

const affectedSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    govId: {
        type: String,
        unique: true,
        sparse: true,
        required: false,
        validate: {
            validator: function (v) {
                const dniRegex = /^\d{8}[A-Za-z]$/
                const nieRegex = /^[XYZ]\d{7}[A-Z]$/

                if (dniRegex.test(v)) {

                    const dniNumbers = v.slice(0, -1)
                    const letrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKE'
                    const indice = dniNumbers % 23
                    const letraCalculada = letrasDNI.charAt(indice)

                    return letraCalculada === v.slice(-1).toUpperCase()
                }

                else if (nieRegex.test(v)) {

                    const nieNumbers = v.slice(1, -1)
                    const letrasNIE = 'TRWAGMYFPDXBNJZSQVHLCKE'
                    const indice = nieNumbers % 23
                    const letraCalculada = letrasNIE.charAt(indice)

                    return letraCalculada === v.slice(-1)
                } else {
                    return false
                }
            },
            message: props => `${props.value} is not a valid NIE or DNI`
        }
    },
    neededItems: {
        microwave: { type: Boolean, default: false },
        fridge: { type: Boolean, default: false },
        mattress: { type: Boolean, default: false }
        // mattress: { type: Number, min: 0, max: 2, default: 0 }
    },
    video: {
        type: String,
        required: false
    },
    utilityBill: {
        name: { type: String, required: false },
        address: { type: String, required: false },
        utilityType: { type: String, enum: ['water', 'electricity'], required: false },
        url: { type: String, required: false }
    },
    location: {
        type: { type: String, enum: ['Point'], required: false },
        coordinates: {
            type: [Number],
            required: false,
            validate: {
                validator: isWithinBoundaries,
                message: props => `Coordinates ${props.value} are not within the specified boundaries`
            }
        }
    }
})

affectedSchema.index({ location: '2dsphere' })

export default model("Affected", affectedSchema)