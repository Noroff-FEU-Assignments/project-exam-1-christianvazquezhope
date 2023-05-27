const api = "https://dev.digithings.io/wp-api/wp-json/wp/v2/posts";
let perPage = 12;
let currentPage = 1;
const postsPerPage = 3;

const postContainer = document.querySelector(".carousel");
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading");
loadingIndicator.textContent = "Loading posts...";
postContainer.appendChild(loadingIndicator);

const btnContainer = document.createElement("div");
btnContainer.classList.add("btn-container");

function renderPosts(posts) {
  postContainer.innerHTML = '';

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, posts.length);

  for (let i = startIndex; i < endIndex; i++) {
    const post = posts[i];

    const postWrapper = document.createElement("div");
    postWrapper.classList.add("item");

    const postLink = document.createElement("a");
    postLink.classList.add("link");
    postLink.href = `/blog/post.html?id=${post.id}`;

    const postImage = document.createElement("img");
    postImage.classList.add("image");
    postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
    postImage.alt = post.title.rendered;
    postLink.appendChild(postImage);

    const postTitle = document.createElement("h2");
    postTitle.classList.add("title");
    postTitle.textContent = post.title.rendered;
    postLink.appendChild(postTitle);

    postWrapper.appendChild(postLink);
    postContainer.appendChild(postWrapper);
  }

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPosts(posts);
    }
  });

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPosts(posts);
    }
  });

  btnContainer.innerHTML = '';
  btnContainer.appendChild(prevBtn);
  btnContainer.appendChild(nextBtn);
  postContainer.appendChild(btnContainer);
}

function fetchPosts() {
  const params = new URLSearchParams({
    categories: "17",
    per_page: perPage,
    _embed: true
  });

  fetch(`${api}?${params.toString()}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Sorry, there was an error loading the posts... Please try refreshing the page.");
      }
    })
    .then(posts => {
      renderPosts(posts);
    })
    .catch(error => {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = "Sorry, there was an error loading the posts... Please try refreshing the page.";
      postContainer.appendChild(errorMessage);
    });
}

fetchPosts();