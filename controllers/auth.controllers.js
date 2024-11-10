import mongoose from 'mongoose'
import User from '../models/User.model.js'
import Affected from '../models/Affected.model.js'
import Helper from '../models/Helper.model.js'
import { handleDuplicateKeyError } from '../helpers/duplicate-key-error-handler.js'

const signUp = async (req, res, next) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    const { email, password, phone, role, firstName, lastName, affectedData } = req.body
    let userRoleObj
    let affectedId
    let helperId
    let user

    try {

        if (role === 'AFFECTED') {
            [userRoleObj] = await Affected.create([{ ...affectedData }], { session })
            affectedId = userRoleObj._id
        }
        if (role === 'HELPER') {
            [userRoleObj] = await Helper.create([{}], { session })
            helperId = userRoleObj._id
        }

        const userCreationData = { email, password, phone, role, firstName, lastName }
        if (affectedId) {
            userCreationData.affectedId = affectedId
        }
        if (helperId) {
            userCreationData.helperId = helperId
        }
        [user] = await User.create([userCreationData], { session })

        if (role === 'AFFECTED') {
            await Affected.findByIdAndUpdate(affectedId, { identity: user._id }, { session })
        } else if (role === 'HELPER') {
            await Helper.findByIdAndUpdate(helperId, { identity: user._id }, { session })
        }

        await session.commitTransaction()
        session.endSession()

        const userResponse = { email: user.email, _id: user._id, phone: user.phone, role: user.role, firstName: user.firstName, lastName: user.lastName, affectedId, helperId }

        res.status(201).json({ user: userResponse })

    } catch (err) {
        if (session.inTransaction()) {
            await session.abortTransaction()
        }
        session.endSession()

        if (userRoleObj && !user) {
            if (role === 'AFFECTED') {
                await Affected.findByIdAndDelete(affectedId)
            } else if (role === 'HELPER') {
                await Helper.findByIdAndDelete(helperId)
            }
        }
        handleDuplicateKeyError(err, req, res, next)
    }
}

const logIn = (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "provide_email_and_password" })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ field: "email", message: "email_not_found" })
                return
            }

            if (foundUser.validatePassword(password)) {
                const authToken = foundUser.signToken()
                const userRole = foundUser.role
                res.json({ authToken, role: userRole })
            }
            else {
                res.status(401).json({ field: "password", message: "wrong_password" })
            }
        })
        .catch(err => next(err))
}

const verify = (req, res, next) => {
    res.status(200).json(req.payload)
}

export { signUp, logIn, verify }