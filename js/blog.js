const api = "https://dev.digithings.io/wp-api/wp-json/wp/v2/posts";
const params = new URLSearchParams({
  categories: "17",
  per_page: 10,
  _embed: true
});

const postContainer = document.querySelector(".container.blog");
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading");
loadingIndicator.textContent = "Loading posts...";
postContainer.appendChild(loadingIndicator);

function renderPosts(posts) {
  postContainer.innerHTML = '';
  
  posts.forEach(post => {
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
  });

  const moreButton = document.createElement("button");
  moreButton.classList.add("more-btn");
  moreButton.textContent = "Load more posts";
  moreButton.addEventListener("click", () => {
    params.set('page', parseInt(params.get('page')) + 1);
    fetchPosts(params);
  });
  postContainer.appendChild(moreButton);
}

function fetchPosts(params) {
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

fetchPosts(params);