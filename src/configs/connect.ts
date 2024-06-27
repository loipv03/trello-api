import mongoose from 'mongoose';

const connectMongooDB = async (uri: string) => {
    try {
        const connection = await mongoose.connect(uri);
        console.log('Kết nối thành công!');
        return connection;
    } catch (err) {
        console.error('Lỗi kết nối:', err);
        throw err;
    }
};

export default connectMongooDB;