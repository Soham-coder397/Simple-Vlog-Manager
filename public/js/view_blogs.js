const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const icon = document.getElementById("icon");

btn.onclick = () => {
    menu.classList.toggle("show");
    if(icon.classList[1] == "fa-bars") {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }
    else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}

let blogs = [];

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

                        <!-- From Uiverse.io by vinodjangid07 --> 
                        <button class="btn-delete">
                            Delete
                        </button>
                    </div>
                </div>
            `;

            card.querySelector(".btn-edit").addEventListener("click", () => {
                editBlog(blog.id);
            });

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

async function deleteBlog(id) {
    const ok = confirm("Are you sure you want to delete this blog?");

    if (!ok) 
        return;

    const response = await fetch(`/blogs/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    alert(data.message);
    loadBlogs();

}

async function editBlog(id) {
    const blog = blogs.find(b => b.id === id);

    if (!blog)
        return;

    const title = prompt("Enter Blog Title", blog.title);

    if (title === null)
        return;

    const author = prompt("Enter Author", blog.author);

    if (author === null)
        return;

    const category = prompt("Enter Category", blog.category);

    if (category === null)
        return;

    const description = prompt("Enter Description", blog.description);

    if (description === null)
        return;

    const content = prompt("Enter Content", blog.content);

    if (content === null)
        return;

    const response = await fetch(`/blogs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            author,
            category,
            description,
            content
        })
    });

    const data = await response.json();
    alert(data.message);
    loadBlogs();

}