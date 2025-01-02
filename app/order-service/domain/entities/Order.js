const {EntitySchema} = require("typeorm");

const Order = new EntitySchema({
    name: "Order",
    tableName: "orders",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
        },
        userId: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        eventId: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        totalPrice: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
        },
        status: {
            type: "varchar",
            length: 20,
            default: "Pending",
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
    },
    relations: {
        items: {
            type: "one-to-many",
            target: "OrderItem",
            inverseSide: "order",
            cascade: true,
        },
    },
});

module.exports = Order;