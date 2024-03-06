import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import environment from './environment';

const DB = async () => {
    try {
        const conn = await mongoose.connect(environment.mongoDB.url);
        console.log('DB succesfully connected to', conn.connection.name);
        return conn.connection.name;
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

export default DB;