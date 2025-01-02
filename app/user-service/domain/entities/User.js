const {EntitySchema} = require('typeorm');

const User = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        userId: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        username: {
            type: 'varchar',
            unique: true,
        },
        email: {
            type: 'varchar',
            unique: true,
        },
        password: {
            type: 'varchar',
        },
        status: {
            type: 'varchar',
            default: 'active',
        },
    },
});

module.exports = User;