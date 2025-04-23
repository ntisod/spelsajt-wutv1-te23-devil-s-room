document.addEventListener('DOMContentLoaded', () => {
    let currentFilter = 'allTime';
    const highscoresTable = document.querySelector('.highscores-table tbody');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Sample data in case the JSON file fails to load
    const sampleData = {
        "allTime": [
            {
                "rank": 1,
                "username": "DevilMaster",
                "score": 100000,
                "time": "1:23:45",
                "date": "2025-04-01"
            },
            {
                "rank": 2,
                "username": "GhostHunter",
                "score": 95000,
                "time": "1:25:30",
                "date": "2025-03-30"
            },
            {
                "rank": 3,
                "username": "ShadowWalker",
                "score": 90000,
                "time": "1:28:15",
                "date": "2025-03-28"
            }
        ],
        "weekly": [
            {
                "rank": 1,
                "username": "DevilMaster",
                "score": 100000,
                "time": "1:23:45",
                "date": "2025-04-01"
            },
            {
                "rank": 2,
                "username": "GhostHunter",
                "score": 95000,
                "time": "1:25:30",
                "date": "2025-03-30"
            }
        ],
        "monthly": [
            {
                "rank": 1,
                "username": "DevilMaster",
                "score": 100000,
                "time": "1:23:45",
                "date": "2025-04-01"
            },
            {
                "rank": 2,
                "username": "GhostHunter",
                "score": 95000,
                "time": "1:25:30",
                "date": "2025-03-30"
            },
            {
                "rank": 3,
                "username": "ShadowWalker",
                "score": 90000,
                "time": "1:28:15",
                "date": "2025-03-28"
            }
        ]
    };

    // Load highscores data
    async function loadHighscores() {
        try {
            const response = await fetch('../data/highscores.json');
            if (!response.ok) {
                throw new Error('Failed to load highscores');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn('Using sample data:', error);
            return sampleData;
        }
    }

    // Display highscores in table
    function displayHighscores(scores) {
        if (!scores || !scores[currentFilter] || scores[currentFilter].length === 0) {
            highscoresTable.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem;">
                        Inga poäng tillgängliga för denna period
                    </td>
                </tr>`;
            return;
        }

        highscoresTable.innerHTML = scores[currentFilter].map(score => `
            <tr class="${score.rank <= 3 ? 'top-3' : ''}">
                <td class="rank">#${score.rank}</td>
                <td>${score.username}</td>
                <td>${score.score.toLocaleString()}</td>
                <td>${score.time}</td>
                <td>${formatDate(score.date)}</td>
            </tr>
        `).join('');
    }

    // Format date to local string
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Update current filter
            currentFilter = button.getAttribute('data-filter');
            
            // Load and display highscores
            const scores = await loadHighscores();
            displayHighscores(scores);
        });
    });

    // Initial load
    loadHighscores().then(scores => {
        if (scores) {
            displayHighscores(scores);
        }
    });
}); 