const api = "https://dev.digithings.io/wp-api/wp-json/wp/v2/posts";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

const postContainer = document.querySelector(".container.post");
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading");
loadingIndicator.textContent = "Loading post...";
postContainer.appendChild(loadingIndicator);

let currentPost = null;

function renderPost(post) {
  currentPost = post;

  postContainer.innerHTML = '';

  const blogpostContent = document.createElement("div");
  blogpostContent.classList.add("post-content");

  const postImage = document.createElement("img");
  postImage.classList.add("featured-image");
  postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
  postImage.alt = post.title.rendered;
  postImage.addEventListener("click", openModal);
  blogpostContent.appendChild(postImage);

  const postContent = document.createElement("div");
  postContent.classList.add("content");

  const contentTitle = document.createElement("h1");
  contentTitle.classList.add("title");
  contentTitle.textContent = post.title.rendered;
  postContent.appendChild(contentTitle);

  postContent.innerHTML += post.content.rendered;
  blogpostContent.appendChild(postContent);

  postContainer.appendChild(blogpostContent);

  document.title = post.title.rendered + " - Hope Down Under";
}

function openModal() {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-bg");
  overlay.addEventListener("click", closeModal);

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalClose = document.createElement("span");
  modalClose.classList.add("modal-close");
  modalClose.textContent = "✖";
  modalClose.addEventListener("click", closeModal);

  const modalImage = document.createElement("img");
  modalImage.classList.add("modal-image");
  modalImage.src = currentPost._embedded["wp:featuredmedia"][0].source_url;
  modalImage.alt = currentPost.title.rendered;

  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalImage);
  modal.appendChild(modalContent);

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  modalContent.addEventListener("click", e => e.stopPropagation());
}

function closeModal() {
  const overlay = document.querySelector(".modal-bg");
  const modal = document.querySelector(".modal");
  if (overlay && modal) {
    overlay.remove();
    modal.remove();
  }
}

function fetchPost(postId) {
  fetch(`${api}/${postId}?_embed`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Sorry, there was an error loading the post... Please try refreshing the page.");
      }
    })
    .then(post => {
      renderPost(post);
    })
    .catch(error => {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = "Sorry, there was an error loading the post... Please try refreshing the page.";
      postContainer.appendChild(errorMessage);
    });
}

fetchPost(postId);