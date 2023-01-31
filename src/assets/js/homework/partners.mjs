const helpers = {
  initIsVisibleObserver: ({ callback, element, shallDisconnect = true }) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback({ element, isVisible: entry.isIntersecting })
        shallDisconnect && entry.isIntersecting && observer.disconnect()
      })
    })
    observer.observe(element)
  }
}

const animation = {
  appendLottie: () => new Promise((resolve, reject) => {
    const scriptEl = document.createElement('script')
    scriptEl.src = '/assets/js/homework/vendor/lottie.min.js'
    scriptEl.async = true
    scriptEl.onload = () => resolve()
    document.head.appendChild(scriptEl)
  }),
  fetchJSON: async () => {
    const response = await fetch('/assets/videos/animation.json')
    return response.json()
  },
  observerCallback: async ({ element, isVisible }) => {
    if (isVisible) {
      await animation.appendLottie()
      const player = lottie.loadAnimation({
        wrapper: element,
        animType: 'svg',
        loop: true,
        animationData: await animation.fetchJSON()
      })
      player.setQuality('low')
      player.addEventListener('DOMLoaded', () => {
        helpers.initIsVisibleObserver({
          callback: ({ isVisible }) => isVisible ? player.play() : player.stop(),
          element,
          shallDisconnect: false
        })
      })
    }
  },
  init: () => {
    helpers.initIsVisibleObserver({
      callback: animation.observerCallback,
      element: document.querySelector('.animation')
    })
  }
}

animation.init()
