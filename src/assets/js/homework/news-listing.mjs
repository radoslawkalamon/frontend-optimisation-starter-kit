import './vendor/jquery.min.js'

const ctaAds = () => {
  $.ajax({
    url: '/cta-ad.html',
    type: 'GET'
  })
    .then(function (response) {
      document.getElementById('js-cta-ad').innerHTML = response;
    });
}

// Init News Listing
ctaAds();
