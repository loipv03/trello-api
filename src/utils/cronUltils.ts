import cron from 'node-cron';
import User from '../models/user';

cron.schedule('0 0 * * *', async () => {
    const now = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const expirationDate = new Date(now.getTime() - oneDayInMs);

    try {
        await User.deleteMany({ isActive: false, createdAt: { $lt: expirationDate } });
        console.log('Deleted inactive users');
    } catch (error) {
        console.error('Error deleting inactive users:', error);
    }
});
