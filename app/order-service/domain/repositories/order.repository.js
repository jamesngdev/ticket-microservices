const {AppDataSource} = require("../../infastructure/database");
const Order = require('./../entities/Order')
const OrderRepository = AppDataSource.getRepository(Order);

OrderRepository.updateOrderStatus = async (orderId, status) => {
    return OrderRepository.update({id: orderId}, {status});
}

module.exports = OrderRepository
