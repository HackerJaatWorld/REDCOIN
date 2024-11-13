

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, set, ref, get, remove, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyClpLE58PQ9eu9BQ_81roYj7Qr8likcKU4",
    authDomain: "curd-d7e67.firebaseapp.com",
    projectId: "curd-d7e67",
    storageBucket: "curd-d7e67.firebasestorage.app",
    messagingSenderId: "1001989988591",
    appId: "1:1001989988591:web:141f3e4811d2f9cc35fb1a",
    measurementId: "G-R4TS0E6Y71"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const totalRedPoints = document.getElementById("totalredpoints");

// btn.addEventListener("click", function () {
//     const username = document.getElementById("username").value;
//     const userid = document.getElementById("userid").value;

//     set(ref(db, 'users/' + userid), {
//         user: username,
//         id: userid,
//         timestamp: Date.now()  // Adds the current timestamp
//     });

//     msg.textContent = 'done';
//     document.getElementById("username").value = '';
//     document.getElementById("userid").value = '';
// });

function readData() {
    const userRef = ref(db, 'users/');
    get(userRef).then((snapshot) => {
        const data = snapshot.val();
        const storedUsername = localStorage.getItem('username');

        for (const key in data) {
            const userData = data[key];

            // Check if the current user's ID matches the stored user ID
            if (userData.username === storedUsername) {
                // Store specific user data in localStorage
                localStorage.setItem('user_data', JSON.stringify(userData));

                // Display user's totalRedPoints or any specific property as needed
                totalRedPoints.textContent = userData.totalPoints;
                break;
            }
        }
    }).catch((error) => {
        console.error('Error reading data:', error);
    });
}


readData();


function loadLeaderboard() {
    const userRef = ref(db, 'users/');
    get(userRef).then((snapshot) => {
        const data = snapshot.val();
        const storedUsername = localStorage.getItem('username'); // assuming username is stored in localStorage
        let usersArray = [];

        // Convert data to an array of user objects
        for (const key in data) {
            usersArray.push({
                userfullname: data[key].userfullname,
                totalPoints: data[key].totalPoints,
                username: data[key].username
            });
        }

        // Get the total number of users
        const totalUsers = usersArray.length;

        // Update the total-users element
        const totalUsersElement = document.querySelector('.total-users');
        totalUsersElement.innerText = `Total: ${totalUsers} users`;

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
                <div class="name">${user.userfullname}</div>
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

const userId = localStorage.getItem("userid");

function displayReferralLink() {
    const referralLink = `http://127.0.0.1:5500/index.html?start=${userId}`;
    document.getElementById('referralLink').value = referralLink;
}

displayReferralLink();

document.getElementById("raferlinkbtn").addEventListener("click",function(){
    const referralLinkInput = document.getElementById('referralLink');
    referralLinkInput.select();
    document.execCommand('copy');
    alert('Referral link copied!');
});

function awardReferralPoints(referrerId, newUsername) {
    const referralPoints = 5000;
    const referralEntry = {
        username: newUsername,
        points: referralPoints,
        timestamp: Date.now()
    };

    // Add the referral entry
    const newReferralRef = push(ref(db, `referrals/${referrerId}`));
    set(newReferralRef, referralEntry);

    // Optionally, update the user’s total points
    const userRef = ref(db, `users/${referrerId}/totalPoints`);
    get(userRef).then(snapshot => {
        const currentPoints = snapshot.val() || 0;
        set(userRef, currentPoints + referralPoints);
    });
}

awardReferralPoints()