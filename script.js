/* ============================================================
   Small helper code for the site. No libraries are needed.

   What it does:
   - puts the current year in the footer
   - shows your latest posts on the home page
   - builds the post list and tag filter on the blog page
   The posts themselves are listed in posts.js.
   ============================================================ */

// Put the current year in the footer.
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Return the published posts, newest first. Drafts are left out.
function getPublishedPosts() {
  if (typeof posts === "undefined") {
    return [];
  }
  return posts
    .filter(function (post) {
      return !post.draft;
    })
    .sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
}

// Turn "2026-11-16" into "November 16, 2026".
function formatDate(isoDate) {
  const parts = isoDate.split("-");
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Build one list item for a post.
function buildPostItem(post, headingTag) {
  const item = document.createElement("li");
  item.className = "post-item";

  const heading = document.createElement(headingTag);
  const link = document.createElement("a");
  link.href = post.file;
  link.textContent = post.title;
  heading.appendChild(link);

  const meta = document.createElement("p");
  meta.className = "post-meta";
  const time = document.createElement("time");
  time.dateTime = post.date;
  time.textContent = formatDate(post.date);
  meta.appendChild(time);
  (post.tags || []).forEach(function (tag) {
    const pill = document.createElement("span");
    pill.className = "tag";
    pill.textContent = tag;
    meta.appendChild(pill);
  });

  const summary = document.createElement("p");
  summary.className = "post-summary";
  summary.textContent = post.summary || "";

  item.append(heading, meta, summary);
  return item;
}

// Fill a container with a list of posts, or a short message if there are none.
function showPosts(container, list, headingTag, emptyMessage) {
  container.textContent = "";

  if (list.length === 0) {
    const note = document.createElement("p");
    note.className = "empty-note";
    note.textContent = emptyMessage;
    container.appendChild(note);
    return;
  }

  const listElement = document.createElement("ul");
  listElement.className = "post-list";
  list.forEach(function (post) {
    listElement.appendChild(buildPostItem(post, headingTag));
  });
  container.appendChild(listElement);
}

// Home page: show the three newest posts.
const latestBox = document.getElementById("latest-posts");
if (latestBox) {
  showPosts(latestBox, getPublishedPosts().slice(0, 3), "h3", "No posts yet. Check back soon.");
}

// Blog page: show every post, with buttons to filter by tag.
const listBox = document.getElementById("post-list");
const filterBox = document.getElementById("tag-filter");

if (listBox) {
  const allPosts = getPublishedPosts();
  let activeTag = "";

  const render = function () {
    const visible = activeTag
      ? allPosts.filter(function (post) {
          return (post.tags || []).includes(activeTag);
        })
      : allPosts;
    showPosts(listBox, visible, "h2", "No posts yet. Check back soon.");
  };

  if (filterBox) {
    // Collect every tag used, without repeats, in alphabetical order.
    const tags = [];
    allPosts.forEach(function (post) {
      (post.tags || []).forEach(function (tag) {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    tags.sort();

    // Only show the filter when there is something to choose between.
    if (tags.length > 1) {
      filterBox.hidden = false;

      const buttons = [];
      ["All"].concat(tags).forEach(function (label) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.setAttribute("aria-pressed", label === "All" ? "true" : "false");
        button.addEventListener("click", function () {
          activeTag = label === "All" ? "" : label;
          buttons.forEach(function (other) {
            other.setAttribute("aria-pressed", other === button ? "true" : "false");
          });
          render();
        });
        buttons.push(button);
        filterBox.appendChild(button);
      });
    }
  }

  render();
}
