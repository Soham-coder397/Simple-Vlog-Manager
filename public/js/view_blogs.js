// ===================== ELEMENTS =====================
const form = document.getElementById("blogform");
const popup = document.getElementById("edit-popup");
const blogId = document.getElementById("blogId");
const title = document.getElementById("title");
const author = document.getElementById("author");
const category = document.getElementById("category");
const description = document.getElementById("description");
const content = document.getElementById("content");

// Image Elements
const imageInput = document.getElementById("image");
const previewImage = document.getElementById("previewImage");

// Mobile Menu
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const icon = document.getElementById("icon");

btn.onclick = () => {

    menu.classList.toggle("show");

    if (icon.classList.contains("fa-bars")) {

        icon.classList.replace("fa-bars", "fa-xmark");

    } else {

        icon.classList.replace("fa-xmark", "fa-bars");

    }

};

let blogs = [];


// ===================== LOAD BLOGS =====================
async function loadBlogs() {

    const container = document.getElementById("blogs");

    container.innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch("/blogs");

        if (!response.ok) {

            throw new Error("Failed to load blogs");

        }

        blogs = await response.json();

        container.innerHTML = "";

        if (blogs.length === 0) {

            container.innerHTML = `
                <div class="empty">
                    No Blogs Found
                </div>
            `;

            return;

        }

        blogs.forEach(blog => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <img src="${blog.image}" alt="${blog.title}">

                <div class="card-content">

                    <span class="category">
                        ${blog.category}
                    </span>

                    <h3>
                        ${blog.title}
                    </h3>

                    <p>
                        ${blog.content}
                    </p>

                    <p class="author">
                        By ${blog.author}
                    </p>

                    <div class="btn-group">

                        <button class="btn-edit">
                            Edit
                        </button>

                        <button class="btn-delete">
                            Delete
                        </button>

                    </div>

                </div>
            `;

            // Edit Button
            card.querySelector(".btn-edit").addEventListener("click", () => {

                openEditPopup(blog);

            });

            // Delete Button
            card.querySelector(".btn-delete").addEventListener("click", () => {

                deleteBlog(blog.id);

            });

            container.appendChild(card);

        });

    }

    catch (err) {

        console.error(err);

        container.innerHTML = `
            <div class="empty">
                Error Loading Blogs
            </div>
        `;

    }

}

loadBlogs();


// ===================== OPEN EDIT POPUP =====================
function openEditPopup(blog) {

    popup.style.display = "flex";

    blogId.value = blog.id;

    title.value = blog.title;
    author.value = blog.author;
    category.value = blog.category;
    description.value = blog.description;
    content.value = blog.content;

    // Reset File Input
    imageInput.value = "";

    // Show Existing Image
    if (blog.image) {

        previewImage.src = blog.image;
        previewImage.style.display = "block";

    } else {

        previewImage.src = "";
        previewImage.style.display = "none";

    }

}

// ===================== DELETE BLOG =====================
async function deleteBlog(id) {

    const ok = confirm("Are you sure you want to delete this blog?");

    if (!ok) return;

    try {

        const response = await fetch(`/blogs/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Delete Failed");
        }

        alert(data.message);

        loadBlogs();

    }

    catch (err) {

        console.error(err);

        alert(err.message);

    }

}


// ===================== UPDATE BLOG =====================
form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const id = blogId.value;

    const formData = new FormData();

    formData.append("title", title.value);
    formData.append("author", author.value);
    formData.append("category", category.value);
    formData.append("description", description.value);
    formData.append("content", content.value);

    // Upload new image (optional)
    if (imageInput.files.length > 0) {

        formData.append("image", imageInput.files[0]);

    }

    try {

        const response = await fetch(`/blogs/${id}`, {

            method: "PUT",
            body: formData

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Update Failed");

        }

        alert(data.message);

        closePopup();

        loadBlogs();

    }

    catch (err) {

        console.error(err);

        alert(err.message);

    }

});


// ===================== IMAGE PREVIEW =====================
imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {

        previewImage.style.display = "none";
        return;

    }

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;
        previewImage.style.display = "block";

    };

    reader.readAsDataURL(file);

});


// ===================== CLOSE POPUP =====================
function closePopup() {

    popup.style.display = "none";

    form.reset();

    blogId.value = "";

    previewImage.src = "";

    previewImage.style.display = "none";

}


// ===================== CLICK OUTSIDE TO CLOSE =====================
popup.addEventListener("click", function (e) {

    if (e.target === popup) {

        closePopup();

    }

});


// ===================== ESC KEY CLOSE =====================
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closePopup();

    }

});


// ===================== CLOSE BUTTON =====================
const popupCloseBtn = document.getElementById("popupCloseBtn");

if (popupCloseBtn) {

    popupCloseBtn.addEventListener("click", closePopup);

}