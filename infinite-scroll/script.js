const postsContainer = document.getElementById("posts-container");
const filter = document.getElementById("filter");
const loading = document.querySelector(".loader");

let limit = 5;
let page = 1;
let isLoading = false;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

// Show loader & fetch more posts
function showLoading() {
  if (isLoading) {
    return;
  }

  page++;
  isLoading = true;
  loading.classList.add("show");
  // Simulate some delay to show loading
  setTimeout(() => {
    showPosts();
    isLoading = false;
    loading.classList.remove("show");
  }, 500);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// Show initial posts
showPosts();

// Event Listener for scrolling function
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
