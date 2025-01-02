const {AppDataSource} = require("../../infastructure/database");
const Order = require('./../entities/Order')
const OrderRepository = AppDataSource.getRepository(Order);

OrderRepository.updateOrderStatus = async (orderId, status) => {
    return OrderRepository.update({id: orderId}, {status});
}

OrderRepository.findById = async (orderId) => {
    // add load items
    return OrderRepository.findOne({id: orderId});
}

OrderRepository.getDetail = (orderId) => {
    return OrderRepository.findOne({
        where: {id: orderId},
        relations: ['items']
    });
}

module.exports = OrderRepository
