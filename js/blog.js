const api = "hhttps://dev.digithings.io/wp-api/wp-json/wp/v2/posts";
const params = new URLSearchParams({
    categories: "17",
});

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('slug');