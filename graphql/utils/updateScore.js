async function updateLikes(post) {
    const likeCount = await post.likes.length;
    post.likeCount = likeCount;
}

async function updateViews(post) {
    const viewCount = await post.views.length;
    post.viewCount = viewCount;
}

module.exports = { updateLikes, updateViews }