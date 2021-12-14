const restful = require('node-restful')
const mongoose = restful.mongoose

const todoSchema = new monngoose.Schema({
    description: { type: String, required: true},
    done: { type: Boolean, required: true, default: false},
    crearedAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Todo', todoSchema)