const User = require("../entities/User");
const {AppDataSource} = require("../../infastructure/database");
const userRepository = AppDataSource.getRepository(User);

userRepository.getUserById = async (id) => {
    return await userRepository.findOne({where: {id}});
}


module.exports = userRepository
