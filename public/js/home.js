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
                        ${blog.author}
                    </p>

                    <div class="btn-group">
                        <button class="btn-read">
                            <span>Read</span>
                        </button>

                        <button class="btn-edit">
                            Edit
                        </button>

                        <!-- From Uiverse.io by vinodjangid07 --> 
                        <button class="btn-delete">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 14"
                            class="svgIcon bin-top"
                        >
                            <g clip-path="url(#clip0_35_24)">
                            <path
                                fill="black"
                                d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                            ></path>
                            </g>
                            <defs>
                            <clipPath id="clip0_35_24">
                                <rect fill="white" height="14" width="69"></rect>
                            </clipPath>
                            </defs>
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 57"
                            class="svgIcon bin-bottom"
                        >
                            <g clip-path="url(#clip0_35_22)">
                            <path
                                fill="black"
                                d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                            ></path>
                            </g>
                            <defs>
                            <clipPath id="clip0_35_22">
                                <rect fill="white" height="57" width="69"></rect>
                            </clipPath>
                            </defs>
                        </svg>
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

    if (!ok) return;

    const response = await fetch(`/blogs/${id}`, {

        method: "DELETE"

    });

    const data = await response.json();

    alert(data.message);

    loadBlogs();

}

async function editBlog(id) {

    const blog = blogs.find(b => b.id === id);

    if (!blog) return;

    const title = prompt("Enter Blog Title", blog.title);

    if (title === null) return;

    const author = prompt("Enter Author", blog.author);

    if (author === null) return;

    const category = prompt("Enter Category", blog.category);

    if (category === null) return;

    const description = prompt("Enter Description", blog.description);

    if (description === null) return;

    const content = prompt("Enter Content", blog.content);

    if (content === null) return;

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