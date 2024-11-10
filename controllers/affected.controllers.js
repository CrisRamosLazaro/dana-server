import Affected from '../models/Affected.model.js'

const getNeededItemsCount = (req, res, next) => {
    Affected.find()
        .select({ neededItems: 1 })
        .then(response => {

            const neededItemsCount = response.reduce((acc, user) => {
                const { neededItems } = user || {}
                if (neededItems) {
                    Object.entries(neededItems).forEach(([key, value]) => {
                        if (value) {
                            acc[key] = (acc[key] || 0) + 1
                        }
                    })
                }
                return acc
            }, {})
            res.json(neededItemsCount)
        })
        .catch(err => next(err))
}

export { getNeededItemsCount }