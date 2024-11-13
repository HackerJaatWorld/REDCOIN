// Function to show the selected section
function showSection(sectionId) {
    // Get all sections and hide them
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Get all navigation items and remove active class
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.classList.remove('active');
    });

    // Show the selected section and mark the corresponding nav item as active
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`.nav-item[onclick="showSection('${sectionId}')"]`).classList.add('active');
}




// Data for each roadmap point
const roadmapData = [
    { title: "Bot Loanch", date: "1 Dec 2024", status: "completed" },
    { title: "Leaderboard", date: "15 Dec 2024", status: "in-progress" },
    { title: "Rafer Earning", date: "25 Dec 2024", status: "pending" },
    { title: "Task Earning", date: "1 Jan 2024", status: "pending" },
    { title: "One Game Earning", date: "20 Jan 2024", status: "pending" },
    { title: "Airdrop Section", date: "20 Feb 2024", status: "pending" },
    { title: "Airdrop distribute", date: "1 Mar 2024", status: "pending" },
    { title: "Token Listing", date: "10 Mar 2024", status: "pending" },
    { title: "Token distribute", date: "15 Mar 2024", status: "pending" },
    { title: "Game Center", date: "20 Mar 2024", status: "pending" },
];

// Function to display roadmap points
function renderRoadmap() {
    const roadmapContainer = document.getElementById("roadmap");
    roadmapContainer.innerHTML = ""; // Clear existing points

    roadmapData.forEach((point) => {
        // Create elements for each roadmap point
        const roadmapPoint = document.createElement("li");
        roadmapPoint.classList.add("roadmap-point", point.status);

        const pointInfo = document.createElement("div");
        pointInfo.classList.add("point-info");

        const pointTitle = document.createElement("div");
        pointTitle.classList.add("point-title");
        pointTitle.textContent = point.title;

        const pointDate = document.createElement("div");
        pointDate.classList.add("point-date");
        pointDate.textContent = point.date;

        pointInfo.appendChild(pointTitle);
        pointInfo.appendChild(pointDate);

        const statusIndicator = document.createElement("div");
        statusIndicator.classList.add("status");
        statusIndicator.textContent = point.status.replace("-", " ");
        
        // Append elements
        roadmapPoint.appendChild(pointInfo);
        roadmapPoint.appendChild(statusIndicator);
        roadmapContainer.appendChild(roadmapPoint);
    });
}

// Initial rendering of the roadmap
renderRoadmap();

function closeRoadmapBtn(){
    document.getElementById("roademap-container").style.top = '-50%';
}
function cheackRoadmap(){
    document.getElementById("roademap-container").style.top = '50%';
}
