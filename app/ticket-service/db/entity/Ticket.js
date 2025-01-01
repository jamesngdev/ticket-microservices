const {EntitySchema} = require('typeorm');

const Ticket = new EntitySchema({
    name: 'Ticket', // Tên logic của thực thể
    tableName: 'tickets', // Tên bảng trong cơ sở dữ liệu
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        user_id: {
            type: 'uuid',
        },
        event_id: {
            type: 'varchar',
        },
        ticket_type: {
            type: 'varchar',
        },
        price: {
            type: 'decimal',
        },
        status: {
            type: 'varchar',
            default: 'PENDING',
        },
        created_at: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        updated_at: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP', // Thời gian cập nhật
        },
    },
});

module.exports = Ticket;