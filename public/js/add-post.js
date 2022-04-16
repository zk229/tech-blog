const { DateTime } = require("luxon");

const postFormHandler = async (event) => {
    event.preventDefault();
    //console.log("test 1");
  
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();
    const date = DateTime.now().toISODate();
  
    if (content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add post.');
      }
    }
};

 document.querySelector(".post-form").addEventListener("submit", postFormHandler);