function revealScheduledContent(config) {
  const now = new Date();
  const releaseDate = new Date(
    config.year,
    config.month - 1, // Month is zero-based in JS
    config.day,
    config.hour || 0,
    config.minute || 0
  );

  if (now >= releaseDate) {
    // Option 1: Reveal inline content
    if (config.mode === "show") {
      const target = document.getElementById(config.targetId);
      if (target) {
        target.style.display = "block";
      }
    }

    // Option 2: Load content from another file
    if (config.mode === "load") {
      fetch(config.sourceFile)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch content");
          return response.text();
        })
        .then((html) => {
          const target = document.getElementById(config.targetId);
          if (target) {
            target.innerHTML = html;
          }
        })
        .catch((err) => {
          console.error("Scheduled content load failed:", err);
        });
    }
  }
}
function revealScheduledPosts() {
  const now = new Date();
  const scheduledPosts = document.querySelectorAll(".scheduled-post");

  scheduledPosts.forEach(post => {
    const scheduledDate = post.getAttribute("data-scheduled");
    if (!scheduledDate) return;

    const releaseDate = new Date(scheduledDate);

    if (now >= releaseDate) {
      post.style.display = "block"; // or "flex" if you're using Flexbox layouts
    }
  });
}