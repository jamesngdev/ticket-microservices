const {EntitySchema} = require('typeorm');

const User = new EntitySchema({
    name: 'User', // Logical name of the entity
    tableName: 'users', // Optional: Name of the table in the database
    columns: {
        userId: {
            primary: true,
            type: 'uuid',
            generated: 'uuid', // Automatically generates IDs
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