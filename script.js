// // Sign up
// function signup() {
//   const username = document.getElementById('signup-username').value;
//   const password = document.getElementById('signup-password').value;
//   if (username && password) {
//     localStorage.setItem('user', JSON.stringify({ username, password }));
//     alert('Sign up successful! Please login.');
//     window.location.href = 'index.html';
//   } else {
//     alert('Fill in both fields');
//   }
// }

// // Login
// function login() {
//   const username = document.getElementById('login-username').value;
//   const password = document.getElementById('login-password').value;
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   if (storedUser && username === storedUser.username && password === storedUser.password) {
//     window.location.href = 'tracker.html';
//   } else {
//     alert('Invalid credentials');
//   }
// }

// // Tracker
// if (window.location.pathname.includes('tracker.html')) {
//   const habits = [
//     'Commit to Github',
//     'Code for 2hrs minimum',
//     'Daily lesson journal',
//     'Daily tweet of progress'
//   ];

//   const trackerBody = document.getElementById('tracker-body');
//   const savedStatus = JSON.parse(localStorage.getItem('tracker')) || {};

//   habits.forEach((habit, i) => {
//     const row = document.createElement('tr');
//     row.innerHTML = `<td>${i + 1}</td><td>${habit}</td>`;
//     ['Fri', 'Sat', 'Sun', 'Mon'].forEach(day => {
//       const td = document.createElement('td');
//       const checkbox = document.createElement('input');
//       checkbox.type = 'checkbox';
//       checkbox.checked = savedStatus[`${i}-${day}`] || false;
//       checkbox.addEventListener('change', () => {
//         savedStatus[`${i}-${day}`] = checkbox.checked;
//         localStorage.setItem('tracker', JSON.stringify(savedStatus));
//       });
//       td.appendChild(checkbox);
//       row.appendChild(td);
//     });
//     trackerBody.appendChild(row);
//   });
// }


// Sign up
function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  if (username && password) {
    localStorage.setItem('user', JSON.stringify({ username, password }));
    alert('Sign up successful! Please login.');
    window.location.href = 'index.html';
  } else {
    alert('Fill in both fields');
  }
}

// Login
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && username === storedUser.username && password === storedUser.password) {
    window.location.href = 'tracker.html';
  } else {
    alert('Invalid credentials');
  }
}

// Tracker
if (window.location.pathname.includes('tracker.html')) {
  const trackerBody = document.getElementById('tracker-body');
  let trackerData = JSON.parse(localStorage.getItem('trackerData')) || [];

  function saveTrackerData() {
    localStorage.setItem('trackerData', JSON.stringify(trackerData));
  }

  function renderTracker() {
    trackerBody.innerHTML = '';
    trackerData.forEach((habitObj, i) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${i + 1}</td><td contenteditable="false">${habitObj.name}</td>`;
      
      for (let d = 0; d < 7; d++) {
        const td = document.createElement('td');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = habitObj.days[d] || false;
        cb.addEventListener('change', () => {
          habitObj.days[d] = cb.checked;
          saveTrackerData();
        });
        td.appendChild(cb);
        row.appendChild(td);
      }

      const actionTd = document.createElement('td');
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        const td = row.querySelector('td:nth-child(2)');
        td.contentEditable = true;
        td.focus();
        td.onblur = () => {
          habitObj.name = td.textContent.trim();
          td.contentEditable = false;
          saveTrackerData();
        };
      };

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.onclick = () => {
        trackerData.splice(i, 1);
        saveTrackerData();
        renderTracker();
      };

      actionTd.appendChild(editBtn);
      actionTd.appendChild(delBtn);
      row.appendChild(actionTd);
      trackerBody.appendChild(row);
    });
  }

  window.addHabit = function () {
    const name = prompt('Enter habit name:');
    if (name) {
      trackerData.push({ name: name, days: Array(15).fill(false) });
      saveTrackerData();
      renderTracker();
    }
  };

  renderTracker();
}
