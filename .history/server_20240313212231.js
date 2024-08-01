const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const nodemailer = require('nodemailer');
const url =
  "mongodb+srv://devpatel2604:CubRzMISMJ0kagBE@mongotest.zudzzgr.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const port = 443;
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://devpatel2604:CubRzMISMJ0kagBE@mongotest.zudzzgr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const userSchema_student = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  classID: String,
  password: String,
  role: String,
});

const userSchema_staff = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  password: String,
  role: String,
});

const mon = mongoose.model("User", userSchema, "admin");
const monStaff = mongoose.model("UserStaff", userSchema_staff, "staff");
const monStudent = mongoose.model("UserStudent", userSchema_student, "student");
const UserModel = mongoose.model("User",userSchema,"admin");
const User = mongoose.model("UserAdmin", userSchema, "admin");
const UserStaff = mongoose.model("UserStaff", userSchema_staff, "staff");
const UserStudent = mongoose.model(
  "UserStudent",
  userSchema_student,
  "student"
);

// Create a super admin user if none exists
User.findOne({ role: "superadmin" })
  .then((user) => {
    if (!user) {
      bcrypt
        .hash("superadminpassword", 10)
        .then((hashedPassword) => {
          const superAdminUser = new User({
            username: "superadmin",
            password: hashedPassword,
            role: "superadmin",
          });

          superAdminUser
            .save()
            .then(() => {
              console.log("Super admin user created successfully");
            })
            .catch((error) => {
              console.error("Error creating super admin user:", error);
            });
        })
        .catch((error) => {
          console.error("Error hashing password:", error);
        });
    }
  })
  .catch((error) => {
    console.error("Error finding super admin:", error);
  });

// Middleware for parsing request bodies as JSON
app.use(express.json());

//code for pop up

// API route for user registration
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      email,
      password: encryptedPassword,
      role: userType,
    });
    res.send({ status: "User Created" });
  } catch (error) {
    res.send(error);
    console.log("error");
  }
});
app.post("/api/register-staff", async (req, res) => {
  console.log(req.body);
  const { username, email, name, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await UserStaff.findOne({ username });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await UserStaff.create({
      username,
      email,
      name,
      password: encryptedPassword,
      role: userType,
    });
    res.send({ status: "User Created" });
  } catch (error) {
    res.send({ status: "error" });
    console.log("error");
  }
});

app.post("/api/register-student", async (req, res) => {
  console.log(req.body);
  const { username, email, name, classID, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await UserStudent.findOne({ username });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await UserStudent.create({
      username,
      email,
      name,
      classID,
      password: encryptedPassword,
      role: userType,
    });
    res.send({ status: "User Created" });
  } catch (error) {
    res.send({ status: "error" });
    console.log("error");
  }
});

// API route for user login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  let userRole;

  try {
    let User = mongoose.model("UserAdmin", userSchema, "admin");
    let user = await User.findOne({ email });

    if (!user) {
      User = mongoose.model("UserStaff", userSchema_staff, "staff");
      user = await User.findOne({ email });
    }

    if (!user) {
      User = mongoose.model("UserStudent", userSchema_student, "student");
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    console.log(JSON.stringify(result));
    console.log("Login successful");
    userRole = user.role;
    const payload = { email, role: userRole };
    const secret = process.env.JWT_SECRET;
    const jwtToken = jwt.sign(payload, secret);
    return res.status(200).json({ email, jwtToken, role: userRole });
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const authenticateUser = (req, res, next) => {
  const userRole = "superadmin";
  if (userRole !== "superadmin") {
    return res.status(403).send("Acess Denied");
  }
  next();
};
app.get("/admin", authenticateUser, (req, res) => {
  MongoClient.connect(url, function (err, client) {
    console.log("Hello");
    databasesList = client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      return res.status(500).send("Internal server error");
    }
    const db = client.db("test");
    db.collection("admin")
      .find({ role: "admin" })
      .toArray(function (err, users) {
        if (err) {
          console.error("Error retrieving users:", err);
          return res.status(500).send("Internal server error");
        }
        res.send(users);
      });
  });
});

app.get("/api/users", (req, res) => {
  const userRole = "superadmin";
  if (userRole !== "superadmin") {
    return res.status(403).send("Access denied");
  }

  // Example for now replace with actual data
  const users = [
    { _id: 1, name: "User 1", role: "admin" },
    { _id: 2, name: "User 2", role: "admin" },
    { _id: 3, name: "User 3", role: "user" },
  ];

  res.json(users);
});

app.get("/fetch/:id", function (req, res) {
  const fetchId = req.params.id;
  mon
    .find({ id: fetchId })
    .then((val) => {
      if (val.length === 0) {
        res.send("No Data");
      } else {
        res.send(val);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});

app.get("/fetchadmins", (req, res) => {
  mon
    .find({ role: "admin" }, { password: 0, __v: 0, _id: 0 })
    .then((val) => {
      res.json(val);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});

app.get("/fetchstaff", (req, res) => {
  monStaff
    .find({ role: "staff" }, { password: 0, __v: 0})
    .then((val) => {
      res.json(val);
      console.log(val);
    })
    .catch((err) => {
      console.error("Error:", err);
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.get("/fetchstudent", (req, res) => {
  monStudent
    .find({ role: "student" }, { password: 0, __v: 0, _id: 0 })
    .then((val) => {
      res.json(val);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});

app.delete("/deleteadmin/:username", (req, res) => {
  const userName = req.params.username;
  mon
    .deleteOne({ username: userName })
    .then(() => {
      res.send("Deleted");
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});
app.delete("/deletestudent/:username", (req, res) => {
  const userName = req.params.username;
  monStudent
    .deleteOne({ username: userName })
    .then(() => {
      res.send("Deleted");
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});

app.delete("/deletestaff/:username", (req, res) => {
  const userName = req.params.username;
  monStaff
    .deleteOne({ username: userName })
    .then(() => {
      res.send("Deleted");
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});

app.post("/updateAdmin/:username", (req, res) => {
  const usernameToUpdate = req.params.username;
  const newName = req.body.name;
  const newUsername = req.body.username;
  const newEmail = req.body.email;

  if (usernameToUpdate !== newUsername) {
    mon
      .findOne({ username: newUsername })
      .then((existingAdmin) => {
        if (existingAdmin) {
          return res
            .status(400)
            .send(
              "Username already exists. Please choose a different username."
            );
        }

        return mon.findOneAndUpdate(
          { username: usernameToUpdate },
          { $set: { name: newName, username: newUsername, email: newEmail } }
        );
      })
      .then(() => {
        res.send("Updated");
      })
      .catch((err) => {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
      });
  } else {
    mon
      .findOneAndUpdate(
        { username: usernameToUpdate },
        { $set: { name: newName, email: newEmail } }
      )
      .then(() => {
        res.send("Updated");
      })
      .catch((err) => {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
      });
  }
});

function updateAdmin(usernameToUpdate, newName, newUsername, newEmail, res) {
  mon
    .updateOne(
      { username: usernameToUpdate }, // Find the admin by the existing username
      { $set: { name: newName, username: newUsername, email: newEmail } } // Update the fields
    )
    .then(() => {
      res.send("Updated");
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
}

app.post("/updateStaff/:username", (req, res) => {
  const userName = req.params.username;
  const name = req.body.name;
  const email = req.body.email;

  monStaff
    .updateOne({ username: userName }, { name: name, email: email })
    .then(() => {
      res.send("Updated");
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});

app.post("/updateStudent/:username", (req, res) => {
  const userName = req.params.username;
  const name = req.body.name;
  const email = req.body.email;

  monStudent
    .updateOne({ username: userName }, { name: name, email: email })
    .then(() => {
      res.send("Updated");
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    });
});

app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  console.log("REached Here")
  UserModel.findOne({ email: email }).then((user) => {
    if (!user) { //remember to change back to !user
      return res.status(400).json({ msg: "There is no user with that email" });
    }
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, "jwt_secret_key", {expiresIn: "1d",});

    //Sending Email


    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kpdpkt.project@gmail.com",
        pass: "aftgqkggqgybscsd",
      },
    });

    var mailOptions = {
      from: "kpdpkt.project@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset_password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({Status: "Success"});
      }
    });
  });
});

app.post('/reset-password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              UserModel.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"})
              )
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})

app.post('/create-playlist')

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
