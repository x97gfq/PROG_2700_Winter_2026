const API = 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30';

dayjs.extend(dayjs_plugin_relativeTime);

const btnLoad  = document.getElementById('btnLoad');
const chkTop10 = document.getElementById('chkTop10');
const statsBar = document.getElementById('statsBar');
const status   = document.getElementById('status');
const results  = document.getElementById('results');

let allStories = [];

// STEP 1 SOLUTION: Fetch with Axios + async/await + try/catch
async function loadStories() {
    status.textContent  = 'Loading stories…';
    statsBar.innerHTML  = '';
    results.innerHTML   = '';
    btnLoad.disabled    = true;

    try {
        const response = await axios.get(API);

        // The HN Algolia API wraps results in a 'hits' array
        allStories = response.data.hits;

        status.textContent = '';
        renderStories(allStories);

    } catch (err) {
        status.textContent = '';
        results.innerHTML  = `<div class="error"><strong>Error:</strong> ${err.message}</div>`;

    } finally {
        btnLoad.disabled = false;
    }
}

// STEP 2 + 3 SOLUTION: Sort, stats, and render
function renderStories(stories) {
    // STEP 3 SOLUTION: Sort by points descending with Lodash
    const sorted = _.orderBy(stories, ['points'], ['desc']);

    // STEP 4 BONUS SOLUTION: trim to 10 if checkbox is checked
    const display = chkTop10.checked ? sorted.slice(0, 10) : sorted;

    // STEP 3 SOLUTION: Stats bar using _.meanBy, _.maxBy, _.sumBy
    const avgPoints    = Math.round(_.meanBy(stories, 'points'));
    const topStory     = _.maxBy(stories, 'points');
    const totalComments = _.sumBy(stories, 'num_comments');

    statsBar.innerHTML = `
        <div class="stats">
            <div class="stat">
                <div class="num">${stories.length}</div>
                <div class="lbl">Stories</div>
            </div>
            <div class="stat">
                <div class="num">${avgPoints}</div>
                <div class="lbl">Avg Points</div>
            </div>
            <div class="stat">
                <div class="num">${topStory.points}</div>
                <div class="lbl">Top Score<br><em>${topStory.title.slice(0, 30)}…</em></div>
            </div>
            <div class="stat">
                <div class="num">${totalComments}</div>
                <div class="lbl">Total Comments</div>
            </div>
        </div>
    `;

    // STEP 2 SOLUTION: Render each story as a card
    results.innerHTML = display.map((story, i) => `
        <div class="story">
            <div class="story-row">
                <span class="rank">${i + 1}</span>
                <div>
                    <div class="story-title">
                        <a href="${story.url ?? '#'}" target="_blank" rel="noopener">
                            ${story.title}
                        </a>
                    </div>
                    <div class="story-meta">
                        by ${story.author}
                        &bull; ${story.points} points
                        &bull; ${story.num_comments} comments
                        &bull; ${dayjs(story.created_at).fromNow()}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

btnLoad.addEventListener('click', loadStories);

// STEP 4 BONUS: re-render on toggle without refetching
chkTop10.addEventListener('change', () => {
    if (allStories.length > 0) renderStories(allStories);
});
