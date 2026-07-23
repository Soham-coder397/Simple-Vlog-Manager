const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const uploadPath = path.join(__dirname, "public", "uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const FILE_PATH = path.join(__dirname, "blogs.json");

// ================= READ =================

function readBlogs() {

    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, "[]");
    }

    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

// ================= MULTER =================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        cb(null, "img_" + file.originalname);
    }
});

const upload = multer({ storage });

// ================= PAGES =================

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "home.html"));

});

app.get("/add_blog", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "add_blog.html"));

});


// ================= API =================

app.get("/blogs", (req, res) => {

    res.json(readBlogs());

});

// ================= ADD BLOG =================

app.post("/add_blog", upload.single("image"), (req, res) => {

    const {

        title,
        author,
        category,
        description,
        content

    } = req.body;

    const blogs = readBlogs();

    const blog = {

        id: Date.now(),

        title,

        author,

        category,

        description,

        content,

        image: req.file ? "/uploads/" + req.file.filename : ""

    };

    blogs.push(blog);

    writeBlogs(blogs);

    res.json({

        success: true,

        message: "Blog Added Successfully",

        blog

    });

});


// ================= SERVER =================

app.listen(PORT, () => {

    console.log(

        `Server Running : http://localhost:${PORT}`

    );

});