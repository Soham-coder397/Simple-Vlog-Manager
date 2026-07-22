const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ================= UPLOAD CONFIG =================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage });

// ================= HOME =================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

// ================= ADD BLOG PAGE =================

app.get("/add_blog", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "add_blog.html"));
});

// ================= POST BLOG =================

app.post("/add_blog", upload.single("image"), (req, res) => {

    const { title, author, category, description, content } = req.body;

    console.log("========== NEW BLOG ==========");
    console.log("Title :", title);
    console.log("Author :", author);
    console.log("Category :", category);
    console.log("Description :", description);
    console.log("Content :", content);

    if (req.file) {
        console.log("Image :", req.file.filename);
    }

    console.log("==============================");

    res.send("Blog Published Successfully!");

});

// ================= SERVER =================

app.listen(PORT, () => {
    console.log(`Server Running : http://localhost:${PORT}`);
});