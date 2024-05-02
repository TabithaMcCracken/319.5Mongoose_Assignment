import Grade from '../models/gradeModel.js'

const indexGrades = async(req,res)=>{
    let result = await Grade.find({}).limit(10);
    console.log(result);
    if (!result) res.send('Not found').status(404);
    res.send(result).status(200);
}

export {indexGrades, }