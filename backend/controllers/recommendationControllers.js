const Recommendation = require('../models/recommendationModel')
const asyncHandler = require('express-async-handler')

const postRecommendation = asyncHandler(async (req, res) => {
    try {
        const newRecommendation = await Recommendation.create(req.body)
        res.json(newRecommendation)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getRecommendations = asyncHandler(async (req, res) => {
    try {
        const recommendations = await Recommendation.find()

        if (!recommendations) {
            res.status(404)
            throw new Error('Recommendations not found')
        }

        res.json(recommendations)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getRecommendationById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const recommendation = await Recommendation.findById(id)

        if (!recommendation) {
            res.status(404)
            throw new Error('Recommendation not found')
        }

        res.json(recommendation)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateRecommendation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const recommendation = await Recommendation.findByIdAndUpdate(id)

        if (!recommendation) {
            res.status(404)
            throw new Error('Recommendation not found')
        }

        res.json(recommendation)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteRecommendation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const recommendation = await Recommendation.findByIdAndDelete(id)

        if (!recommendation) {
            res.status(404)
            throw new Error('Recommendation not found')
        }

        res.json(recommendation)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    postRecommendation,
    getRecommendations,
    getRecommendationById,
    updateRecommendation,
    deleteRecommendation
}