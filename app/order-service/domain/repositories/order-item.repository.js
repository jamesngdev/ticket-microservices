const {AppDataSource} = require("../../infastructure/database");
const OrderItem = require('./../entities/OrderItem')
const OrderItemRepository = AppDataSource.getRepository(OrderItem);

module.exports = OrderItemRepository
