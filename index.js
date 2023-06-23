const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "everestwalk"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "Select * from employee";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})

app.post("/api/post", (req, res) => {
    const { name, email, phone } = req.body;
    const sqlPost = "Insert into employee(name, email, phone) values(?,?,?)";
    db.query(sqlPost, [name, email, phone], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
})

app.delete("/api/delete/:id", (req, res) => {
    const { id } = req.params;
    const sqlDelete = "Delete from employee where id = ?";
    db.query(sqlDelete, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "Select * from employee where id= ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/updateEmployee/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const sqlUpdate = "Update employee set name=? , email=? , phone=? where id=?";
    db.query(sqlUpdate, [name, email, phone, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.get("/", (req, res) => {
    // const sqlInsert= "Insert into employee(name, email, phone) values ('suyog', 'suyogrdahal@gmail.com', 0123456789)";
    // db.query(sqlInsert, (error, result)=>{
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // })


})
app.listen(5000, () => {
    console.log("server is running");
})