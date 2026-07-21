document.addEventListener("DOMContentLoaded", () => {

    // ==================== GET ELEMENTS ====================
    const form = document.getElementById("blogform");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const category = document.getElementById("category");
    const description = document.getElementById("description");
    const content = document.getElementById("content");
    const image = document.getElementById("image");
    const confirmBox = document.getElementById("confirm");
    const clearBtn = document.getElementById("clearBtn");
    const popup = document.getElementById("successPopup");
    const popupCloseBtn = document.getElementById("popupCloseBtn");

    // ==================== IMAGE VALIDATION ====================
    image.addEventListener("change", validateImage);

    // ==================== REAL TIME VALIDATION ====================
    [title, author, description, content].forEach(input => {
        input.addEventListener("input", function () {
            clearFieldError(this);
        });

    });

    category.addEventListener("change", function () {
        clearFieldError(this);
    });

    image.addEventListener("change", function () {
        clearFieldError(this);
    });

    confirmBox.addEventListener("change", function () {
        if (this.checked) {
            this.focus();
        }
    });

    // ==================== FORM SUBMIT ====================
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        // ==================== BLOG TITLE ====================
        if (title.value.trim() === "") {

            showError(title, "Please enter the blog title.");
            isValid = false;

        } else if (title.value.trim().length < 5) {

            showError(title, "Blog title must be at least 5 characters.");
            isValid = false;

        }

        // ==================== AUTHOR ====================
        if (author.value.trim() === "") {
            showError(author, "Please enter the author name.");
            isValid = false;
        }

        // ==================== CATEGORY ====================
        if (category.value === "") {
            showError(category, "Please select a category.");
            isValid = false;
        }

        // ==================== DESCRIPTION ====================
        if (description.value.trim() === "") {

            showError(description, "Please enter a short description.");
            isValid = false;
        } 
        else if (description.value.trim().length < 20) {
            showError(description, "Description must be at least 10 characters.");
            isValid = false;
        }

        // ==================== CONTENT ====================
        if (content.value.trim() === "") {

            showError(content, "Please write your blog.");
            isValid = false;
        } 
        else if (content.value.trim().length < 50) {
            showError(content, "Blog content must be at least 50 characters.");
            isValid = false;
        }

        // ==================== IMAGE ====================
        if (image.files.length === 0) {
            showError(image, "Please upload an image.");
            isValid = false;
        }

        if (!isValid) {
            return false;
        }

        // ==================== TERMS ====================
        if (!confirmBox.checked) {
            alert("Please accept the Terms & Conditions.");
            confirmBox.focus();
            return false;
        }

        // ==================== SUCCESS ====================
        popup.style.display = "flex";
        form.reset();
        clearErrors();
    });

    // ==================== CLEAR BUTTON ====================
    clearBtn.addEventListener("click", function (e) {
        if (
            title.value.trim() === "" &&
            author.value.trim() === "" &&
            category.value === "" &&
            description.value.trim() === "" &&
            content.value.trim() === "" &&
            image.files.length === 0 &&
            !confirmBox.checked
        ) {
            alert("The form is already empty.");
            e.preventDefault();
            return false;
        }

        const ok = confirm("Are you sure you want to clear the form?");

        if (!ok) {
            e.preventDefault();
            return false;
        }

        clearErrors();
    });

    // ==================== POPUP ====================
    popupCloseBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });

    // ==================== IMAGE VALIDATION FUNCTION ====================
    function validateImage() {
        if (image.files.length === 0) 
            return false;

        const file = image.files[0];

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Only JPG, JPEG and PNG images are allowed.");
            image.value = "";
            return false;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image size must be less than 2 MB.");
            image.value = "";
            return false;
        }
    }

    // ==================== SHOW ERROR ====================
    function showError(input, message) {
        const oldError = input.parentNode.querySelector(".error-message");

        if (oldError) {
            oldError.remove();
        }

        input.style.borderColor = "#ff4d4d";

        const span = document.createElement("span");
        span.className = "error-message";
        span.textContent = message;

        span.style.color = "#ff4d4d";
        span.style.fontSize = "13px";
        span.style.marginTop = "5px";
        span.style.display = "block";

        input.parentNode.appendChild(span);

        if (!document.querySelector(".focused-error")) {
            input.focus();
            input.classList.add("focused-error");
        }
    }

    // ==================== CLEAR ALL ERRORS ====================
    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(error => {
            error.remove();
        });

        document.querySelectorAll("input, textarea, select").forEach(input => {
            input.style.borderColor = "";
            input.classList.remove("focused-error");
        });
    }

    // ==================== CLEAR SINGLE FIELD ERROR ====================
    function clearFieldError(input) {
        input.style.borderColor = "";

        const error = input.parentNode.querySelector(".error-message");

        if (error) {
            error.remove();
        }
    }
});