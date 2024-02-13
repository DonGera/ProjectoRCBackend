const express = require("express");

const {
	validateCreate,
	validateDelete,
	validateGetWithQueryStrings,
} = require("../middlewares/validators/user");

const {
	validateCreatePedido,
} = require("../middlewares/validators/pedido");

const {
	deleteUser,
	readUser,
	readUsers,
	updateUser,
} = require("../controllers/User");

const { login, register } = require("../controllers/Auth");

const {
	readPedido,
	readPedidos,
	createPedido,
	deletePedido,
	searchPedidos,
	updatePedido,
} = require("../controllers/Pedido");

const { verifyToken } = require("../middlewares/verifyToken");
const { verifyIsAdmin } = require("../middlewares/verifyIsAdmin");

const router = express.Router();

router.post("/create-user", validateCreate, register);

router.delete("/delete-user/:id", validateDelete, deleteUser);
router.put("/update-user", updateUser);
router.get(
	"/read-users-paginated",
	validateGetWithQueryStrings,
	readUsers
);
router.get("/read-users", verifyToken, verifyIsAdmin, readUsers);
router.get("/read-user/:id", verifyToken, readUser);

router.post("/login", login);

router.get("/read-pedidos", readPedidos);

router.get("/read-pedido/:id", readPedido);

router.post(
	"/create-pedido",
	validateCreatePedido,
	verifyToken,
	verifyIsAdmin,
	createPedido
);

router.get("/search-pedidos", searchPedidos)

router.delete(
	"/delete-pedido/:id",
	verifyToken,
	verifyIsAdmin,
	deletePedido
)
router.put("/update-pedido", verifyToken, verifyIsAdmin, updatePedido)

module.exports = router