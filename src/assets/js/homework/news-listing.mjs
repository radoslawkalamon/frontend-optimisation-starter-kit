const newsListing = {
  fetchAd: async () => {
    const response = await fetch('/cta-ad.html')
    const adHTML = await response.text()
    document.getElementById('js-cta-ad').innerHTML = adHTML
  },
  init: () => {
    newsListing.fetchAd()
  }
}

newsListing.init()
