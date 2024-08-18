const { Router } = require('express')
const { postRecommendation, getRecommendations, getRecommendationById, updateRecommendation, deleteRecommendation } = require('../../controllers/recommendationControllers')
const recommendationRouter = Router()

recommendationRouter.post('/', postRecommendation)
recommendationRouter.get('/', getRecommendations)
recommendationRouter.get('/:id', getRecommendationById)
recommendationRouter.put('/:id', updateRecommendation)
recommendationRouter.delete('/:id', deleteRecommendation)

module.exports = recommendationRouter