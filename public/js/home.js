// ===================== ELEMENTS =====================
const form = document.getElementById("blogform");
const popup = document.getElementById("edit-popup");

const blogId = document.getElementById("blogId");

const title = document.getElementById("title");
const author = document.getElementById("author");
const category = document.getElementById("category");
const description = document.getElementById("description");
const content = document.getElementById("content");

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

            // EDIT
            card.querySelector(".btn-edit").addEventListener("click", () => {
                openEditPopup(blog);
            });

            // DELETE
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

    // image input থাকলে
    const imageInput = document.getElementById("image");

    if (imageInput && imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    try {

        const response = await fetch(`/blogs/${id}`, {

            method: "PUT",
            body: formData

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);

        popup.style.display = "none";

        form.reset();

        loadBlogs();

    }

    catch (err) {

        console.error(err);

        alert(err.message);

    }

});


// ===================== CLOSE POPUP (CLICK OUTSIDE) =====================
popup.addEventListener("click", function (e) {

    if (e.target === popup) {

        popup.style.display = "none";

    }

});


// ===================== ESC KEY CLOSE =====================
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        popup.style.display = "none";

    }

});


// ===================== RESET WHEN POPUP CLOSE =====================
function closePopup() {

    popup.style.display = "none";

    form.reset();

}

const popupCloseBtn = document.getElementById("popupCloseBtn");

if (popupCloseBtn) {

    popupCloseBtn.addEventListener("click", closePopup);

}