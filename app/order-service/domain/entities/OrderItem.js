const {EntitySchema} = require("typeorm");

const OrderItem = new EntitySchema({
    name: "OrderItem",
    tableName: "order_items",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
        },
        ticketId: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        ticketType: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        quantity: {
            type: "int",
            nullable: false,
        },
        unitPrice: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
        },
        totalPrice: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
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
        order: {
            type: "many-to-one",
            target: "Order",
            inverseSide: "items",
            onDelete: "CASCADE",
        },
    },
});

module.exports = OrderItem