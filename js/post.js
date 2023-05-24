const api = "https://dev.digithings.io/wp-api/wp-json/wp/v2/posts";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

const postContainer = document.querySelector(".container.blogpost");
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading");
loadingIndicator.textContent = "Loading post...";
postContainer.appendChild(loadingIndicator);

function renderPost(post) {
  postContainer.innerHTML = '';

  const blogpostWrapper = document.createElement("div");
  blogpostWrapper.classList.add("post");

  const postImage = document.createElement("img");
  postImage.classList.add("featured-image");
  postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
  postImage.alt = post.title.rendered;
  postImage.addEventListener("click", openModal);
  blogpostWrapper.appendChild(postImage);

  const postTitle = document.createElement("h1");
  postTitle.classList.add("title");
  postTitle.textContent = post.title.rendered;
  blogpostWrapper.appendChild(postTitle);

  const postContent = document.createElement("div");
  postContent.classList.add("content");
  postContent.innerHTML = post.content.rendered;
  blogpostWrapper.appendChild(postContent);

  postContainer.appendChild(blogpostWrapper);
}

function openModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalClose = document.createElement("span");
  modalClose.classList.add("modal-close");
  modalClose.textContent = "×";
  modalClose.addEventListener("click", closeModal);

  const modalImage = document.createElement("img");
  modalImage.classList.add("modal-image");
  modalImage.src = post._embedded["wp:featuredmedia"][0].source_url;
  modalImage.alt = post.title.rendered;

  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalImage);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.addEventListener("click", closeModal);
  modalContent.addEventListener("click", e => e.stopPropagation());
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
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
