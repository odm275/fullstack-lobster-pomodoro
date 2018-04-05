console.log({starting:true});
import express from 'express';
import db from './config/db';
import mongoose from 'mongoose';
const app = express();
const port = process.env.port || 3001;
const Schema = mongoose.Schema;

mongoose.connect(db.url);
mongoose.connection.once('open', () => {
    console.log('Connected to database, now make fireworks')
}).on('error', (error) =>{
    console.log('Connection error', error);
});

//Create Schema and Model
const SettingsSchema = new Schema({
    _id: String,
    pomodoro: Number,
    shortBreak: Number,
    longBreak: Number,
});
const Settings = mongoose.model('settings', SettingsSchema);//Base model on Settings Schema

app.get('/settings', (req,res) => {
    mongoose.model('settings').find((err,settings) => {
        res.send(settings);
    });
}); 






app.listen(port, ()=> console.log(`Server started on port ${port}`));
