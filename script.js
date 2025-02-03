document.addEventListener('DOMContentLoaded', () => {
    // --- Goal Tracker ---
    const goalForm = document.getElementById('goalForm');
    const goalList = document.getElementById('goalList');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    // Add Goal
    if (goalForm) {
        goalForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const goalName = document.getElementById('goalName').value;
            const goalDeadline = document.getElementById('goalDeadline').value;
            const goalStatus = 'In Progress'; // Default status when adding a new goal

            const newGoal = { name: goalName, deadline: goalDeadline, status: goalStatus };
            goals.push(newGoal);

            localStorage.setItem('goals', JSON.stringify(goals));

            document.getElementById('goalName').value = '';
            document.getElementById('goalDeadline').value = '';

            displayGoals();
            updateProgress();
        });
    }

    // Display Goals
    function displayGoals() {
        goalList.innerHTML = '';
        goals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.classList.add(goal.status === 'Completed' ? 'completed' : 'in-progress');
            li.innerHTML = `
                <span>${goal.name} - ${goal.deadline} - ${goal.status}</span>
                <button onclick="toggleGoal(${index})">${goal.status === 'Completed' ? 'Mark Incomplete' : 'Mark Complete'}</button>
                <button onclick="deleteGoal(${index})">Delete</button>
            `;
            goalList.appendChild(li);
        });
    }

    // Toggle Goal Status
    window.toggleGoal = function (index) {
        goals[index].status = goals[index].status === 'Completed' ? 'In Progress' : 'Completed';
        localStorage.setItem('goals', JSON.stringify(goals));
        displayGoals();
        updateProgress();
    };

    // Delete Goal
    window.deleteGoal = function (index) {
        goals.splice(index, 1);
        localStorage.setItem('goals', JSON.stringify(goals));
        displayGoals();
        updateProgress();
    };

    // Update Progress Bar
    function updateProgress() {
        const completedGoals = goals.filter(goal => goal.status === 'Completed').length;
        const totalGoals = goals.length;
        const progressPercent = totalGoals === 0 ? 0 : (completedGoals / totalGoals) * 100;

        progressBar.style.width = progressPercent + '%';
        progressText.innerText = `Progress: ${Math.round(progressPercent)}%`;

        if (progressPercent <= 33) {
            progressBar.classList.add('low');
            progressBar.classList.remove('medium', 'high');
        } else if (progressPercent <= 66) {
            progressBar.classList.add('medium');
            progressBar.classList.remove('low', 'high');
        } else {
            progressBar.classList.add('high');
            progressBar.classList.remove('low', 'medium');
        }
    }

    // Initial display
    if (goalList) {
        displayGoals();
        updateProgress();
    }

    // --- Study Planner ---
    const studyPlanForm = document.getElementById('studyPlanForm');
    const studyPlansList = document.getElementById('studyPlansList');
    let studyPlans = JSON.parse(localStorage.getItem('studyPlans')) || [];

    // Add Study Plan
    if (studyPlanForm) {
        studyPlanForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const subject = document.getElementById('subject').value;
            const deadline = document.getElementById('deadline').value;
            const priority = document.getElementById('priority').value;

            const newPlan = { subject: subject, deadline: deadline, priority: priority };
            studyPlans.push(newPlan);

            localStorage.setItem('studyPlans', JSON.stringify(studyPlans));

            document.getElementById('subject').value = '';
            document.getElementById('deadline').value = '';
            document.getElementById('priority').value = 'Medium';

            displayStudyPlans();
        });
    }

    // Display Study Plans
    function displayStudyPlans() {
        studyPlansList.innerHTML = '';
        studyPlans.forEach((plan, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${plan.subject} - ${plan.deadline} - Priority: ${plan.priority}</span>
                <button onclick="deleteStudyPlan(${index})">Delete</button>
            `;
            studyPlansList.appendChild(li);
        });
    }

    // Delete Study Plan
    window.deleteStudyPlan = function (index) {
        studyPlans.splice(index, 1);
        localStorage.setItem('studyPlans', JSON.stringify(studyPlans));
        displayStudyPlans();
    };

    // Initial display
    if (studyPlansList) {
        displayStudyPlans();
    }

    // --- Resources ---
    const resourceForm = document.getElementById('resourceForm');
    const resourceList = document.getElementById('resourceList');
    let resources = JSON.parse(localStorage.getItem('resources')) || [];

    // Add Resource
    if (resourceForm) {
        resourceForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const resourceName = document.getElementById('resourceName').value;
            const resourceLink = document.getElementById('resourceLink').value;
            const uploaderName = 'StudyPlanner Group'; // This can be dynamic later

            const newResource = { name: resourceName, link: resourceLink, uploader: uploaderName };
            resources.push(newResource);

            localStorage.setItem('resources', JSON.stringify(resources));

            document.getElementById('resourceName').value = '';
            document.getElementById('resourceLink').value = '';

            displayResources();
        });
    }

    // Display Resources
    function displayResources() {
        resourceList.innerHTML = '';
        resources.forEach((resource, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${resource.link}" target="_blank">${resource.name}</a>
                <span>Uploaded by: ${resource.uploader}</span>
                <button onclick="deleteResource(${index})">Delete</button>
            `;
            resourceList.appendChild(li);
        });
    }

    // Delete Resource
    window.deleteResource = function (index) {
        resources.splice(index, 1);
        localStorage.setItem('resources', JSON.stringify(resources));
        displayResources();
    };

    // Initial display
    if (resourceList) {
        displayResources();
    }

    // --- Login/Sign-up ---
    const signUpForm = document.getElementById('signUpForm');
    const loginForm = document.getElementById('loginForm');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Sign-up Form Submission
    if (signUpForm) {
        signUpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('signUpUsername').value;
            const password = document.getElementById('signUpPassword').value;

            const newUser = { username: username, password: password };
            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));

            alert('Sign-up successful! You can now log in.');
            document.getElementById('signUpUsername').value = '';
            document.getElementById('signUpPassword').value = '';
        });
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const validUser = users.find(user => user.username === username && user.password === password);

            if (validUser) {
                alert('Login successful!');
                // Redirect or show the dashboard page after login
            } else {
                alert('Invalid username or password!');
            }

            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
        });
    }
});
// Handle Profile Picture Upload
document.getElementById('uploadPic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Enable Editing Profile
document.getElementById('editProfile').addEventListener('click', function() {
    document.getElementById('username').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('bio').disabled = false;

    document.getElementById('editProfile').style.display = 'none';
    document.getElementById('saveProfile').style.display = 'inline-block';
});

// Save Profile Changes
document.getElementById('saveProfile').addEventListener('click', function() {
    document.getElementById('username').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('bio').disabled = true;

    // Here you can add code to save the profile info (using localStorage or API)

    document.getElementById('editProfile').style.display = 'inline-block';
    document.getElementById('saveProfile').style.display = 'none';

    alert('Profile updated successfully!');
});
