const mongoose = require("mongoose")

const { model, Schema } = mongoose

const pedidoSchema = new Schema({
	id: String,
	title: { type: String, required: true},
	img: { type: String, required: true},
	detail: { type: String, required: true},
})

pedidoSchema.index({ title: "text", detail: "text" })

module.exports = model("Pedidos", pedidoSchema)