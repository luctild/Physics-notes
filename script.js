function myFunction() {
  const x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
}
// Initialize AdMob
document.addEventListener('DOMContentLoaded', () => {
  loadAdMobBanner();
});

function loadAdMobBanner() {
  if (typeof adsbygoogle === 'undefined') {
    console.error("AdMob script not loaded!");
    return;
  }

  const adContainer = document.getElementById('admob-banner');
  
  // Clear previous ad (if any)
  adContainer.innerHTML = '';

  // Create new ad element
  const adElement = document.createElement('ins');
  adElement.className = 'adsbygoogle';
  adElement.style.display = 'block';
  
  // Your Ad Unit ID (Banner)
  adElement.setAttribute('data-ad-client', 'ca-pub-3772637110380686');
  adElement.setAttribute('data-ad-slot', '7510543486');
  
  // Responsive settings
  adElement.setAttribute('data-ad-format', 'auto');
  adElement.setAttribute('data-full-width-responsive', 'true');
  
  // Append to container
  adContainer.appendChild(adElement);

  // Request Ad
  (adsbygoogle = window.adsbygoogle || []).push({});
}

// Optional: Refresh ad every 60 sec
setInterval(loadAdMobBanner, 60000);

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
