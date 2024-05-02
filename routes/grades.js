import express from 'express'

import db from '../db/conn.js'

import { GridFSBucketReadStream, ObjectId } from 'mongodb'

const router = express.Router()
import Grade from '../models/gradeModel.js'
import { resolveSoa } from 'dns'
import { indexGrades } from '../controller/gradesController.js'

//get all grades- done
router.route('/').get(indexGrades)


//get a single grade by id- done
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    let result = await Grade.findById(id);

    if(!result) res.send("Not found").status (404);
    res.send(result).status(200)
})

// Add a score to a grade entry- done
router.patch ('/:id/add', async(req, res)=>{
    const id = req.params.id;
    // Old code for mongodb
    // let collection = await db.collection('grades');
    // let query = { _id: new ObjectId(req.params.id)};
    
    // Revised code for mongoose
    let result = await Grade.findByIdAndUpdate(req.params.id, {
        $push: {scores: req.body}
    });
    if (!result) res.send('Not found').status(404);
    else res.send(result).status(200)
})

// Create a single grade document 
router.post('/', async (req, res)=>{
    try {
        const grade = await Grade.create(req.body);
        res.status(200).json(grade);
    } catch (err){
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:id/remove', async (req,res)=>{
    const id = req.params. id;
    try {
        let result = await Grade.findByIdAndUpdate(id, {
            $pull: { scores: req. body },
        });
    res.send(result).status(200);
    } catch (err) {
    res.send('Id not found').status (404);
    }
});


// router.patch('/:id/add', async (req,res)=>{
//     const id = 
// })





// Origina Assignment
// // Get a single grade data
// router.get('/:id', async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { _id: new ObjectId(req.params.id) }

//     let result = await collection.findOne(query)

//     if (!result) res.send('Not found').status(404)
//     else res.send(result).status(200)
// })

// router.get("/student/:id", async (req, res) => {
//     res.redirect(`learner/${req.params.id}`);
// });

// // Get grade data for a single student
// router.get('/learner/:id', async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { learner_id: Number(req.params.id) }
//     let result = await collection.find(query).toArray()

//     if (!result) {
//         res.send('Not found').status(404)
//     }
//     else {
//         res.send(result).status(200)
//     }
// })

// // Get grade data for a specific class
// router.get('/class/:id', async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { class_id: Number(req.params.id) }
//     let result = await collection.find(query).toArray()

//     if (!result) {
//         res.send('Not found').status(404)
//     }
//     else {
//         res.send(result).status(200)
//     }
// })

// //    /grades
// router.post('/', async (req, res) => {
//     let collection = await db.collection("grades")
//     let newDocument = req.body

//     if (newDocument.student_id) {
//         newDocument.learner_id = newDocument.student_id
//         delete newDocument.student_id
//     }

//     let result = await collection.insertOne(newDocument)
//     res.send(result).status(204)
// })


// router.patch("/:id/add", async (req, res) => {
//     let collection = await db.collection("grades");
//     let query = { _id: new ObjectId(req.params.id) };
  
//     let result = await collection.updateOne(query, {
//       $push: { scores: req.body },
//     });
  
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// });

// router.patch("/:id/remove", async (req, res) => {
//     let collection = await db.collection("grades");
//     let query = { _id: new ObjectId(req.params.id) };
  
//     let result = await collection.updateOne(query, {
//       $pull: { scores: req.body },
//     });
  
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// });


// router.delete("/:id", async (req, res) => {
//     let collection = await db.collection("grades");
//     let query = { _id: new ObjectId(req.params.id) };
//     let result = await collection.deleteOne(query);
  
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// });




// // Get a class's grade data
// router.get("/class/:id", async (req, res) => {
//     let collection = await db.collection("grades");
//     let query = { class_id: Number(req.params.id) };
  
//     // Check for learner_id parameter
//     if (req.query.learner) query.learner_id = Number(req.query.learner);
  
//     let result = await collection.find(query).toArray();
  
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
// });
  
//   // Update a class id
//   router.patch("/class/:id", async (req, res) => {
//     let collection = await db.collection("grades");
//     let query = { class_id: Number(req.params.id) };
  
//     let result = await collection.updateMany(query, {
//       $set: { class_id: req.body.class_id },
//     });
  
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });
  
//   // Delete a class
//   router.delete("/class/:id", async (req, res) => {
//     let collection = await db.collection("grades");
//     let query = { class_id: Number(req.params.id) };
  
//     let result = await collection.deleteMany(query);
  
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });

// //

export default router;