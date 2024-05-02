import mongoose from "mongoose";
import router from "../routes/grades.js";
 const gradeSchema = new mongoose.Schema({
    learner_id : {
        type: Number,
        required: true,
    },
    class_id:{
        type: Number,
        required: true
    }, 
    scores:[
        {
            type:{
                type: String,
                enum: [
                'examl',
                'quiz',
                'homework',
                'test'
                ]
            },
            score: Number
        }
    ]
 
 })

 export default mongoose.model('grades', gradeSchema)