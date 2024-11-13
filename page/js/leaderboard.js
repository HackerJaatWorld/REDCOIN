// leaderboard.js

// Function to fetch leaderboard data and display the top 50 users
function loadLeaderboard() {
    const userRef = ref(db, 'users/');
    get(userRef).then((snapshot) => {
        const data = snapshot.val();
        const storedUsername = localStorage.getItem('username'); // assuming username is stored in localStorage
        let usersArray = [];

        // Convert data to an array of user objects
        for (const key in data) {
            usersArray.push({
                userfullname: data[key].fullname,
                totalPoints: data[key].totalPoints,
                username: data[key].username
            });
        }

        // Sort users by totalPoints in descending order and get the top 50
        usersArray.sort((a, b) => b.totalPoints - a.totalPoints);
        const top50Users = usersArray.slice(0, 50);

        // Find the rank of the stored user (if they are in the list)
        let storedUserRank = usersArray.findIndex(user => user.username === storedUsername) + 1;

        // Select the leaderboard list container
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = ''; // Clear any existing content

        // Populate the leaderboard list with the top 50 users
        top50Users.forEach((user, index) => {
            const userRank = index + 1;
            const userItem = document.createElement('div');
            userItem.classList.add('leaderboard-item');
            userItem.innerHTML = `
                <div class="rank">#${userRank}</div>
                <div class="name">${user.fullname}</div>
                <div class="points">${user.totalPoints} points</div>
            `;

            // Highlight the stored user
            if (user.username === storedUsername) {
                userItem.classList.add('highlighted-user');
            }

            leaderboardList.appendChild(userItem);
        });

        // Display stored user rank if not in top 50
        if (storedUserRank > 50) {
            const userRankMessage = document.createElement('div');
            userRankMessage.classList.add('user-rank-message');
            userRankMessage.innerText = `Your rank: #${storedUserRank}`;
            leaderboardList.appendChild(userRankMessage);
        }
    }).catch((error) => {
        console.error('Error loading leaderboard data:', error);
    });
}

// Call the function to load the leaderboard
loadLeaderboard();
