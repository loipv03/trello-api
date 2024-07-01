import mongoose from 'mongoose';

const connectMongooDB = async (uri: string) => {
    try {
        const connection = await mongoose.connect(uri);

        mongoose.connection.on('error', (err) => {
            console.log('Kết nối thất bại!');
            throw err
        });
        return connection;
    } catch (err) {
        console.error(err);
    }
};

export default connectMongooDB;