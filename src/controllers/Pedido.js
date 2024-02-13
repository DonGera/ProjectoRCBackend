const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

const PedidoModel = require("../models/Pedido")
const UserModel = require("../models/User")
const { text } = require("express")

async function readPedidos(_, res) {
	try {
		await PedidoModel.find().then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function readPedido(req, res) {
	const { id } = req.params

	try {
		await PedidoModel.findOne({ id }).then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function createPedido(req, res) {
	const { title, img, detail, mentor, img_mentor } = req.body

	const data = new PedidoModel({
		id: uuid.v4(),
		title,
		img,
		detail,
		mentor,
		img_mentor,
	})

	data.save()
	res.status(201).json({
		success: true,
		data: req.body,
	})
}

async function deletePedido(req, res) {
	const { id } = req.params

	try {
		PedidoModel.deleteOne({ id }).then(response => {
			if (response.deletedCount) {
				res.status(200).json({
					message: `El curso con ${id} fue borrado exitosamente.`,
				})
			} else {
				res.status(200).json({
					message: `No se ha encontrado el curso: ${id}`,
				})
			}
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function updatePedido(req, res) {
	const { id_pedido, modify } = req.body

	try {
		PedidoModel.findOneAndUpdate({ id: id_pedido }, modify).then(
			response => {
				if (response.id) {
					res.status(200).json({
						message: `El pedido con id ${response.id} fue editado exitosamente.`,
						data: res.body,
					})
				} else {
					res.status(200).json({
						message: `No se ha encontrado el curso.`,
					})
				}
			}
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function searchPedidos(req, res) {
	const { q } = req.query

	try {
		await PedidoModel.find(
			{
				$text: { $search: q },
			},
			{ score: { $meta: "textScore" } }
		)
			.sort({
				score: { $meta: "textScore" },
			})
			.then(response => {
				res.status(200).json({ data: response })
			})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
	createPedido,
	deletePedido,
	readPedido,
	readPedidos,
	searchPedidos,
	updatePedido,
}