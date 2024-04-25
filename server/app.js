const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const fileupload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

// Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl);

// TESTING
app.get('/klef/test', async function (req, res) {
    res.json("Koneru Lakshmaiah Education Foundation");
});



//upload video
app.post('/uploadvideo', async function(req, res){
    try {
        if (!req.files || !req.files.myfile || !req.body.fname) {
            return res.status(400).json("File or fname not provided");
        }

        const myfile = req.files.myfile;
        const fname = req.body.fname;

        // Move the uploaded file to the desired location
        myfile.mv('../src/images/video/' + fname + '.mp4', async function(err){
            if(err) {
                return res.status(500).json("File upload operation failed!");
            }

            try {
                // Connect to MongoDB
                await client.connect();
                const db = client.db('cms');
                const Student= db.collection('Student');

                // Update the document in MongoDB with the video URL
                const data = await Student.updateOne({emailid: fname}, {$set: {videourl: fname + '.mp4'}});
                await client.close();

                res.json("File uploaded successfully...");
            } catch (err) {
                console.error("Error occurred during database operation:", err);
                res.status(500).json("Database operation failed!");
            }
        });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json("Internal server error");
    }
});




//courseRegistration
app.post('/courseregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms'); // Change to your database name
        const coursereg = db.collection('coursereg');
        const data = await coursereg.insertMany(req.body.courses); // Use insertMany for multiple documents
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.status(404).json(err); // Send status before sending JSON
    }
});

//view courses
app.get('/courseview/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const coursereg = db.collection('coursereg');
        const data = await coursereg.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

//faculty view

app.get('/facultyview/submit', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Faculty = db.collection('Faculty');
        const data = await Faculty.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/faculty/delete', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Faculty = db.collection('Faculty');
        const data = await Faculty.deleteOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});



//failedcourse reg
app.post('/failedregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms'); // Change to your database name
        const failedreg = db.collection('failedreg');
        const data = await failedreg.insertMany(req.body.courses); // Use insertMany for multiple documents
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.status(404).json(err); // Send status before sending JSON
    }
});

app.get('/failedview/submit', async function (req, res) {
    try {
      const conn = await client.connect();
      const db = conn.db('cms');
      const failedreg = db.collection('failedreg');
      const data = await failedreg.find({}).toArray();
      conn.close();
      res.json(data);
    } catch (err) {
      res.json(err).status(404);
    }
  });


app.delete('/failed/delete', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const failedreg = db.collection('failedreg');
        const data = await failedreg.deleteOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});


  

//Betterment Course Reg
app.post('/betterregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms'); // Change to your database name
        const betterreg = db.collection('betterreg');
        const data = await betterreg.insertMany(req.body.courses); // Use insertMany for multiple documents
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.status(404).json(err); // Send status before sending JSON
    }
});

app.get('/betterview/submit', async function (req, res) {
    try {
      const conn = await client.connect();
      const db = conn.db('cms');
      const betterreg = db.collection('betterreg');
      const data = await betterreg.find({}).toArray();
      conn.close();
      res.json(data);
    } catch (err) {
      res.json(err).status(404);
    }
  });


app.delete('/better/delete', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const betterreg = db.collection('betterreg');
        const data = await betterreg.deleteOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});





//certificate

app.post('/certificate/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms'); // Change to your database name
        const certificate = db.collection('certificate');
        const data = await certificate.insertOne(req.body); // Use insertMany for multiple documents
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.status(404).json(err); // Send status before sending JSON
    }
});

app.get('/certificateview/submit', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const certificate = db.collection('certificate');
        const data = await certificate.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/certificate/delete', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const certificate = db.collection('certificate');
        const data = await certificate.deleteOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});



//course view

app.get('/courseview/submit', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const coursereg = db.collection('coursereg');
        const data = await coursereg.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/course/delete', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const coursereg = db.collection('coursereg');
        const data = await coursereg.deleteOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});

// app.put('/course/update', async function (req, res) {
//     try {
//         const conn = await client.connect();
//         const db = conn.db('cms');
//         const coursereg = db.collection('coursereg');
//         const data = await coursereg.updateOne(req.body);
//         conn.close();
//         res.json("Request Recieved");
//     } catch (err) {
//         res.json(err).status(404);
//     }
// });




//ContactUs module
app.post('/contactregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const contact = db.collection('contact');
        const data = await contact.insertOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});

// LOGIN MODULE
app.post('/login/signin', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Student = db.collection('Student');
        const data = await Student.count(req.body);
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

//admin module
app.post('/admin/signin', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Admin = db.collection('Admin');
        const data = await Admin.count(req.body);
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

// FACULTY MODULE
app.post('/faculty/signin', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Faculty = db.collection('Faculty');
        const data = await Faculty.count(req.body);
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});
//Facultyhome

app.post('/facultyhome/fmenu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        fmenu = db.collection('fmenu');
        data = await fmenu.find({}).sort({amid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/facultyhome/fmenus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        fmenus = db.collection('fmenus');
        data = await fmenus.find(req.body).sort({fsmid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});


app.post('/facultyhome/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        Faculty = db.collection('Faculty');
        data = await Faculty.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});
//Faculty course reg
app.post('/fcourseregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms'); // Change to your database name
        const fcoursereg = db.collection('fcoursereg');
        const data = await fcoursereg.insertMany(req.body.courses); // Use insertMany for multiple documents
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.status(404).json(err); // Send status before sending JSON
    }
});

//assignment upload
app.post('/assignments/upload', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var aname = req.body.aname;
        myfile.mv('../src/images/assign/'+ aname +'.pdf', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });
        conn = await client.connect();
        db = conn.db('cms');
        Faculty= db.collection('Faculty');
        data = await Faculty.updateOne({emailid:aname},{$set:{assignurl:aname+'.pdf'}});
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});

// HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        Pro = db.collection('Student');
        data = await Pro.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});


// FORGOT PASSWORD MODULE
app.post('/forgot-password', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Pro = db.collection('Student');

        const { email, newPassword } = req.body;

        const result = await Pro.updateOne(
            { emailid: email },
            { $set: { pwd: newPassword } }
        );

        if (result.modifiedCount > 0) {
            res.json({ message: "Password updated successfully." });
        } else {
            res.json({ message: "Email not found. Password update failed." });
        }

        conn.close();
    } catch (err) {
        res.json(err).status(404);
    }
});

//Menu Module
app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        menu = db.collection('menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Menus Module
app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        menus = db.collection('menus');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//adminhome

app.post('/adminhome/amenu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        amenu = db.collection('amenu');
        data = await amenu.find({}).sort({amid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Menus Module
app.post('/adminhome/amenus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        amenus = db.collection('amenus');
        data = await amenus.find(req.body).sort({asmid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});


app.post('/adminhome/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        Admin = db.collection('Admin');
        data = await Admin.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.get('/studentregistration/submit', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Student = db.collection('Student');
        const data = await Student.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.json(err).status(404);
    }
});

app.delete('/student/delete', async function (req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('cms');
        const Student = db.collection('Student');
        const data = await Student.deleteOne(req.body);
        conn.close();
        res.json("Request Recieved");
    } catch (err) {
        res.json(err).status(404);
    }
});

//CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        Pro = db.collection('Student');
        data = await Pro.updateOne({emailid : req.body.emailid}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//MY PROFILE MODULE
app.post('/myprofile/details', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('cms');
        Pro = db.collection('Student');
        data = await Pro.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/uploaddp', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var fname = req.body.fname;
        myfile.mv('../src/images/photo/'+ fname +'.jpg', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });
        conn = await client.connect();
        db = conn.db('cms');
        Student = db.collection('Student');
        data = await Student.updateOne({emailid:fname},{$set:{imgurl:fname+'.jpg'}});
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});
