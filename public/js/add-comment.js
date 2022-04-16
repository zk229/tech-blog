const { DateTime } = require("luxon");

const commentFormHandler = async (event) => {
    event.preventDefault();
    //console.log("test 1");
  
    const post_id = document.querySelector("#post").dataset.id;
    const content = document.querySelector("#comment-content").value.trim();
    const date = DateTime.now().toISODate();
  
    if (content) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ post_id, content, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to add comment.');
      }
    }
};

 document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);