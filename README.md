# Personal Portfolio Website

My portfolio and blog, built with plain HTML, CSS, and JavaScript. There is nothing to install and no build step.

## See it on your computer

Double-click `index.html`. It opens in your browser, and the blog works the same way.

## What each file does

| File | What it is |
| --- | --- |
| `index.html` | The home page: about, experience, projects, latest writing, contact |
| `blog.html` | The blog page that lists all posts |
| `posts.js` | The list of blog posts. You edit this when you publish |
| `blog/` | One HTML page per post. `_template.html` is the blank starting point |
| `styles/style.css` | Colors, fonts, and layout. The colors are at the top of the file |
| `script.js` | Small helper code that builds the post lists |

## Publish a blog post

1. Copy `blog/_template.html` and rename the copy, for example `blog/my-first-essay.html`.
2. Open the copy and follow the three numbered comments (title, heading and date, then your writing).
3. Open `posts.js` and add a new entry at the top of the list. The instructions are at the top of that file.

To hide a post until it is ready, add `draft: true` to its entry in `posts.js`.

The sample post (`blog/welcome.html`) is a placeholder. Delete the file and its entry in `posts.js` when you add your first real post.

## Change the text

- Hero, About, Experience, Projects, and Contact are all in `index.html`. Find the words you want to change and edit them.
- The navigation links appear in `index.html`, `blog.html`, `blog/_template.html`, and each post. If you add or rename a link, change it in all of them.

## Put it online with GitHub Pages

1. Commit and push these files to the `main` branch.
2. On GitHub, open the repository, go to Settings, then Pages.
3. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute or two the site is live at `https://jphonrado.github.io/Personal-Portfolio-Website/`.
