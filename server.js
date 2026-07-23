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

function readBlogs() {

    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, "[]");
    }

    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

function writeBlogs(blogs) {

    fs.writeFileSync(
        FILE_PATH,
        JSON.stringify(blogs, null, 4)
    );

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

app.get("/status", (req, res) => {
    res.json({
        status: `Server is Running Successfully at http://localhost:${PORT}`,
        success:true,
        message: "API Routing Working Perfectly..."
    });
});

// ================= ADD BLOG =================

app.post("/add_blog", upload.single("image"), (req, res) => {
    console.log(req.body)
    const {
        title,
        author,
        category,
        description,
        content
    } = req.body;

    const blogs = readBlogs();

    const blog = {
        Id: Date.now(),
        Title: title,
        Author:author,
        Category:category,
        Description:description,
        Content:content,
        Image: req.file ? "/uploads/" + req.file.filename : ""
    };

    blogs.push(blog);

    writeBlogs(blogs);

    res.json({
        success: true,
        message: "Blog Added Successfully",
        data: blogs
    });

    console.log("\n\t\tNew Blog Added");
    console.table({
        Id: blog.Id,
        Title: blog.Title,
        Author: blog.Author,
        Category: blog.Category,
        Description: blog.Description,
        Content: blog.Content,
        Image: blog.Image
    });
});


// ================= SERVER =================

app.listen(PORT, () => {

    console.log(

        `Server Running : http://localhost:${PORT}`

    );

});