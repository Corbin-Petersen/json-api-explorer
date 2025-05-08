
// Cache elements for use
const postForm = document.getElementById("postForm");
const error = document.getElementById("error");
const postList = document.getElementById("postList");
const fetchBtn = document.getElementById("fetchButton");

// fetch posts and display them
function addNewPost(newStuff) {
    // check if loading message still exists, and if so, removes it
    if (postList.firstElementChild.id === "loadingMessage"){
        postList.innerHTML = "";
    }
    let newArticle = document.createElement("article");
    newArticle.id = `post-${newStuff.id}`;
    newArticle.class = `post-box`;
    newArticle.innerHTML = `
        <h3 class="post-title">${newStuff.title}</h3>
        <p class="post-body">${newStuff.body}</p>
    `;
    // adds new post to beginning of post list articles, if they exist
    postList.insertBefore(newArticle, postList.firstElementChild); 
}

function renderPosts(posts) {
    postList.innerHTML = "";
    
    posts.forEach ((post) => {
        let postArticle = document.createElement("article");
        postArticle.id = `post-${post.id}`;
        postArticle.class = `post-box`;
        postArticle.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <p class="post-body">${post.body}</p>
        `;
        postList.appendChild(postArticle);
    });
}

fetchBtn.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then((response) => {
            let responseData = response.json();
            console.log(responseData);
            // data is array of objects with userID, id, title, body
            return responseData;
        }).then((data) => {
            renderPosts(data);
    });

});

postForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, body })
    }).then((response) => {
        const jsonResponse = response.json();
        return jsonResponse;
    }).then((newPost) => {
        alert("Post submitted!");
        if (postList.hasChildNodes()) {
            addNewPost(newPost);
        } else {
            renderPosts([newPost]); 
        }
    }).catch((error) => console.error("Error submitting post:", error));

});