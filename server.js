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
        cb(null,Date.now().toString().slice(-5) + "_" + file.originalname);
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
        id: Date.now(),
        title: title,
        author:author,
        category:category,
        description:description,
        content:content,
        image: req.file ? "/uploads/" + req.file.filename : ""
    };

    blogs.unshift(blog);
    writeBlogs(blogs);

    res.json({
        success: true,
        message: "Blog Added Successfully",
        data: blogs
    });
});

app.get("/blogs", (req, res) => {
    res.json(readBlogs());
});

// =============== Edit Page ===================
app.get("/edit_blog", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "edit_blog.html"));
});

// ================= Get Blog By ID =================
app.get("/blogs/:id", (req, res) => {
    const id = Number(req.params.id);
    const blogs = readBlogs();
    const blog = blogs.find(b => b.id === id);
    if (!blog) {
        return res.status(404).json({ 
            success: false, 
            message: "Blog not found" 
        });
    }
    res.json(blog);
});

// ================= Update Blog =================
app.put("/blogs/:id", upload.single("image"), (req, res) => {

    const id = Number(req.params.id);
    const blogs = readBlogs();
    const index = blogs.findIndex(blog => blog.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    const blog = blogs[index];

    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.category = req.body.category;
    blog.description = req.body.description;
    blog.content = req.body.content;

    if (req.file) {

        if (blog.image) {

            const oldImagePath = path.join(
                __dirname,
                "public",
                blog.image.replace("/uploads/", "uploads/")
            );

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        blog.image = "/uploads/" + req.file.filename;
    }

    blogs[index] = blog;

    writeBlogs(blogs);

    res.json({
        success: true,
        message: "Blog Updated Successfully",
        data: blog
    });
});

// ================= Delete Blog =================
app.delete("/blogs/:id", (req, res) => {
   const blogs = readBlogs();
   const newBlogs = blogs.filter(
    b => b.id != req.params.id
   );
   writeBlogs(newBlogs);
   res.json({
    success: true,
    message: "Blog Deleted Successfully",
   });
});

// ================= SERVER =================
app.listen(PORT, () => {
    console.log(`Server Running : http://localhost:${PORT}`);
});