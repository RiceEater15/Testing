let allApps = [];

function loadApps() {
  const spinner = document.getElementById('loading-spinner');
  const container = document.getElementById('app-list');

  spinner.style.display = 'block';

  fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiOW63Pc6Kaw5jZzY0Cs5ol_NnMlhA73afWlHWukblObyOKxoUGWeiqZD9R5SWhp_rgs6OTPzPCyY5zmR_b-q2sWiB7JpUz2C6eUucztAgjxKS9m0CAuyErVqJ79ms5WGMXC14rD7Wuhuwswat33HVLpwcFdm2S9IcAi06FZuvX2vNs0wsmhQ7-cATi732fFQmX7p3sZQCQ-lwIgDBxT0vgYsqF-m5Q_83Nq7pUquN0N-LdACuNz782zjfjXFUkfkgy9sKtA2KQtmJlHYj7UESDOs5ltQ&lib=M-6L6s3vj7kNcfkGIWeID7ErknCf72OHO')
    .then(res => res.json())
    .then(apps => {
      allApps = apps;
      displayApps(apps);
    })
    .catch(err => {
      console.error("Failed to load apps JSON:", err);
      container.innerHTML = "<p>Failed to load app list.</p>";
    })
    .finally(() => {
      spinner.style.display = 'none'; 
    });
}

function displayApps(apps) {
  const container = document.getElementById('app-list');
  container.innerHTML = '';

  apps.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-box app-box2';
    card.innerHTML = `
      <img class="people-pic" src="${app['Icon URL'] || 'https://via.placeholder.com/70'}" alt="${app['App Name']}">
      <div class="people-info">
        <h2>${app['App Name']}</h2>
        <p><strong>Bundle ID:</strong> ${app['Bundle ID']}</p>
        <p><strong>Version:</strong> ${app['Version']}</p>
        <a class="download-button" href="${app['Download URL']}" target="_blank" rel="noopener noreferrer">Download IPA</a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = allApps.filter(app => app['App Name'].toLowerCase().includes(query));
  displayApps(filtered);
});

loadApps(); 
