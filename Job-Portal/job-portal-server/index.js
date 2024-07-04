const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

//middleware
app.use(express.json());
app.use(cors());

//username Ritika11
//pwd jobportall


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Ritika11:jobportall@jobportal.o3lhu3q.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create db 
    const db = client.db("JobPortal");
    const jobsCollections = db.collection("Jobs");

    //post a job 
    app.post("/post-job", async(req, res) => {
      try{
        const body = req.body;
        body.createAt = new Date();
        const result = await jobsCollections.insertOne(body);
        if(result.insertedId){
          return res.status(200).send(result);
        }else{
          return res.status(404).send({
            message: "can not insert! try again later!",
            status: false
          });
        }
      }catch(error){
        console.error("Error posting job:", error);
        res.status(500).send({
          message: "Internal server error",
          status: false
        });
      }
  });

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        const jobs = await jobsCollections.find({}).toArray();
        res.send(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).send({
          message: "Internal server error",
          status: false
        });
      }
    });

    //get single job
    app.get("/all-jobs/:id", async(req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({
        _id: new ObjectId(id)
      });
      res.send(job)
    });

    //get jobs by email
    app.get("/myJobs/:email", async(req, res) => {
      console.log(req.params.email)
      const jobs = await jobsCollections.find({postedBy : req.params.email}).toArray();
      res.send(jobs);
    })

    //delete a job
    app.delete("/job/:id", async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await jobsCollections.deleteOne(filter);
      res.send(result)
    })

    //update a job
    app.patch("/update-job/:id", async(req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData
        },
      };
      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error during MongoDB connection setup:", error);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Developer!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});