const { DataSource } = require('typeorm');
const Ticket = require('./entity/Ticket'); // Đường dẫn đến file entity Ticket của bạn
const { services } = require('../../../libs/core/config'); // Đường dẫn đến cấu hình dịch vụ
const config = services.ticket.config; // Lấy cấu hình cho dịch vụ ticket

// Khởi tạo DataSource để kết nối với cơ sở dữ liệu
const AppDataSource = new DataSource({
    type: config.database.type, // Loại cơ sở dữ liệu (ví dụ: 'postgres', 'mysql', ...)
    host: config.database.host, // Địa chỉ host của cơ sở dữ liệu
    port: config.database.port, // Cổng kết nối cơ sở dữ liệu
    username: config.database.username, // Tên người dùng cơ sở dữ liệu
    password: config.database.password, // Mật khẩu cơ sở dữ liệu
    database: config.database.database, // Tên cơ sở dữ liệu
    synchronize: true, // Tự động đồng bộ cấu trúc cơ sở dữ liệu với entity (sử dụng cẩn thận ở môi trường sản xuất)
    logging: true, // Bật logging để theo dõi các truy vấn SQL
    entities: [Ticket], // Các entity cần được quản lý bởi TypeORM (ở đây là Ticket)
});

module.exports = { AppDataSource };