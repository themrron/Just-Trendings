// Connect to the server via Socket.io
const socket = io();

socket.on('connect', () => {
  console.log('Connected to the server for real time updates.');
});

// Listen for a custom "trendUpdate" event with trend data
socket.on('trendUpdate', (trendData) => {
  updateTrendList(trendData);
});

// Function to add/update trend list
function updateTrendList(trendData) {
  const trendsContainer = document.getElementById('trends-container');
  
  // Clear the container (if you want to replace all data every time)
  trendsContainer.innerHTML = '';

  trendData.forEach((trend, index) => {
    const listItem = document.createElement('div');
    listItem.className = 'list-group-item';

    listItem.innerHTML = `
      <div class="trend-title">${index + 1}. ${trend.title}</div>
      <div class="trend-updated">${trend.time}</div>
    `;

    trendsContainer.appendChild(listItem);
  });
}
