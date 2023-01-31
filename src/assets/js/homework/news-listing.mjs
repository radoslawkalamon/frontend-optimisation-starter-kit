const ctaAds = () => {
  fetch('/cta-ad.html')
    .then(response => response.text())
    .then(response => {
      document.getElementById('js-cta-ad').innerHTML = response;
    })
}

// Init News Listing
ctaAds();
