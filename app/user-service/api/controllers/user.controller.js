const {login} = require("../../applications/use-cases/login.use-case");
const {registerUseCase} = require("../../applications/use-cases/register.use-case");

exports.login = async (call, callback) => {
    const {email, password} = call.request;
    const {error, message, data} = await login({
        email,
        password
    });

    if (error) {
        return callback({
            code: error,
            details: message
        });
    }

    callback(null, {jwt_token: data});
}

exports.register = async (call, callback) => {
    const {username, email, password} = call.request;
    const {error, message} = await registerUseCase({
        username,
        email,
        password
    });


    if (error) {
        return callback({
            code: error,
            details: message,
        });
    }

    callback(null, {message: 'User registered successfully'});
}