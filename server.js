import express from 'express';
import bodyParser from 'body-parser';
import pool from './db.js';
import methodOverride from "method-override"

const app = express();

// Middleware
app.set('view engine', 'ejs'); // Set view engine ke EJS
app.set('views', './views');   // Path untuk file EJS
app.use(bodyParser.urlencoded({ extended: false })); // Parsing form data
app.use(express.static('public')); // Load file statis (CSS/JS)
app.use(methodOverride("_method"))


app.get("/",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC ")
        res.render("index.ejs",{tasks:data.rows})
    } catch (error) {
        console.log(error)
    }

})

app.post("/add",async(req,res)=>{
    try {
        const {title,description}= req.body
        await pool.query("INSERT INTO tasks(title,description) VALUES($1,$2)",[title,description])
        res.redirect("/")
    } catch (error) {
        console.error(error)
    }
})

app.delete("/delete/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        await pool.query("DELETE FROM tasks WHERE id=$1",[id])
        res.redirect("/")
    } catch (error) {
        console.error(error);
    }
})

const port = 3000;
app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})