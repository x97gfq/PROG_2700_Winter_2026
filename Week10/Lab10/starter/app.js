const API = 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30';

dayjs.extend(dayjs_plugin_relativeTime);

const btnLoad  = document.getElementById('btnLoad');
const chkTop10 = document.getElementById('chkTop10');
const statsBar = document.getElementById('statsBar');
const status   = document.getElementById('status');
const results  = document.getElementById('results');

// Cache the full list so the Top 10 toggle can re-render without refetching
let allStories = [];

// STEP 1: Fetch the data using Axios
//
// - Call axios.get(API) with await
// - The stories are at response.data.hits  (not response.data directly)
// - console.log the response so you can inspect the structure in DevTools
// - Show a loading message in #status before the request
// - On success: store hits in allStories, then call renderStories(allStories)
// - On error: show err.message in #results with the .error class
//
async function loadStories() {
    // Your code here

}

// STEP 2 + 3: Render stories and stats
//
// STEP 2 — Loop over stories and render each as a <div class="story"> card:
//   - Rank number (index + 1) inside a <span class="rank">
//   - Title as a link: <a href="${story.url ?? '#'}" target="_blank">${story.title}</a>
//   - Meta line: author, points, comments, and relative time via Day.js
//     dayjs(story.created_at).fromNow()
//
// STEP 3 — Before rendering, sort by points descending using _.orderBy
//          Also render a stats bar in #statsBar using:
//            stories.length            — total count
//            _.meanBy(stories, 'points') — average points (round it)
//            _.maxBy(stories, 'points')  — top story
//            _.sumBy(stories, 'num_comments') — total comments
//
// STEP 4 (Bonus) — If chkTop10.checked is true, only show the top 10 stories.
//   Use .slice(0, 10) after sorting.
//
function renderStories(stories) {
    // Your code here

}

btnLoad.addEventListener('click', loadStories);

// STEP 4 (Bonus): re-render when the checkbox changes
chkTop10.addEventListener('change', () => {
    if (allStories.length > 0) renderStories(allStories);
});
