const scoresBody = document.getElementById('scores-body');
const clearDataBtn = document.getElementById('clear-data-btn');

// Login Elements
const loginScreen = document.getElementById('admin-login-screen');
const dashboardScreen = document.getElementById('admin-dashboard-screen');
const loginBtn = document.getElementById('admin-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const passInput = document.getElementById('admin-pass');

// Simple Password Setup (You can change this password)
const ADMIN_PASSWORD = "admin"; 

// Handle Login
loginBtn.addEventListener('click', handleLogin);
passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});

function handleLogin() {
    const pass = passInput.value.trim();
    if (pass === ADMIN_PASSWORD) {
        loginScreen.classList.remove('active');
        dashboardScreen.classList.add('active');
        passInput.value = ''; // Clear password field
        loadScores();
    } else {
        alert('លេខសម្ងាត់មិនត្រឹមត្រូវទេ! (Hint: admin)');
    }
}

// Handle Logout
logoutBtn.addEventListener('click', () => {
    dashboardScreen.classList.remove('active');
    loginScreen.classList.add('active');
});

// Load Scores Logic
function loadScores() {
    const records = JSON.parse(localStorage.getItem('hardware_quiz_results')) || [];
    
    scoresBody.innerHTML = '';
    
    if (records.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" style="text-align: center; color: var(--text-secondary);">មិនទាន់មានទិន្នន័យសិស្សប្រឡងនៅឡើយទេ</td>`;
        scoresBody.appendChild(tr);
        return;
    }
    
    // Sort by score descending
    records.sort((a, b) => b.score - a.score);
    
    records.forEach((record, index) => {
        const tr = document.createElement('tr');
        
        let percentage = (record.score / record.total) * 100;
        let badgeClass = '';
        let grade = '';
        
        if (percentage >= 90) { badgeClass = 'excellent'; grade = 'ល្អឥតខ្ចោះ'; }
        else if (percentage >= 70) { badgeClass = 'good'; grade = 'ល្អ'; }
        else if (percentage >= 50) { badgeClass = 'fair'; grade = 'មធ្យម'; }
        else { badgeClass = 'poor'; grade = 'ខ្សោយ'; }
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-weight: 600;">${record.name}</td>
            <td><span style="color: var(--accent); font-weight: bold;">${record.score}</span> / ${record.total}</td>
            <td style="color: var(--text-secondary); font-size: 0.9rem;">${record.date}</td>
            <td><span class="badge ${badgeClass}">${grade}</span></td>
        `;
        scoresBody.appendChild(tr);
    });
}

// Clear Data Logic
clearDataBtn.addEventListener('click', () => {
    if(confirm('តើអ្នកពិតជាចង់លុបទិន្នន័យសិស្សទាំងអស់មែនទេ? (មិនអាចទាញយកវិញបានទេ)')) {
        localStorage.removeItem('hardware_quiz_results');
        loadScores();
    }
});
