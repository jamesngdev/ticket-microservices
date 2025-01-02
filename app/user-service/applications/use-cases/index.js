const {login} = require('./login.use-case');
const {registerUseCase} = require('./register.use-case');

module.exports = {
    loginUseCase: login,
    registerUseCase
}