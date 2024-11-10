import User from "../models/User.model.js"
import bcrypt from 'bcryptjs'

const getAllUsers = (req, res, next) => {

    User
        .find()
        .select({ username: 1, role: 1, _id: 1, firstName: 1, lastName: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getAffectedUsers = (req, res, next) => {
    User
        .find({ role: 'AFFECTED' })
        .populate('affectedId')
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOneUser = (req, res, next) => {
    const { id } = req.params

    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            let query = User.findById(id).select('-password')

            if (user.role === 'HELPER') {
                query = query.populate('helperId')
            } else if (user.role === 'AFFECTED') {
                query = query.populate('affectedId')
            }

            return query.exec()
        })
        .then(user => res.json(user))
        .catch(err => next(err))
}

const editOneUser = async (req, res) => {
    const { id } = req.params
    let updateData = req.body

    delete updateData.govId
    delete updateData.role

    try {
        let user = await User.findById(id)

        if (user.role === 'AFFECTED' && updateData.affectedId) {
            await Affected.findByIdAndUpdate(user.affectedId, updateData.affectedId, { runValidators: true, new: true });
        } else if (user.role === 'HELPER' && updateData.helperId) {
            await Helper.findByIdAndUpdate(user.helperId, updateData.helperId, { runValidators: true, new: true });
        }

        if (updateData.password) {
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(updateData.password, salt)
            updateData.password = hashedPassword
        }

        await User.findByIdAndUpdate(id, { $set: updateData }, { runValidators: true, new: true })
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Error updating user' })
    }
}

const deleteOneUser = async (req, res) => {

    const { id } = req.params

    try {
        const user = await User.findById(id)
        if (user.role === 'HELPER') {
            await Helper.findByIdAndDelete(user.helperId)
        } else if (user.role === 'AFFECTED') {
            await Affected.findByIdAndDelete(user.affectedId)
        }
        await user.remove()
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Error deleting user' })
    }
}

export {
    getAllUsers,
    getAffectedUsers,
    getOneUser,
    editOneUser,
    deleteOneUser
}