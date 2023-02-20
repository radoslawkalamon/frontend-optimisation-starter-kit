import helpers from './_helpers.js'

const animation = {
  appendLottie: () => {
    return helpers.appendScript('/assets/js/homework/vendor/lottie.min.js')
  },
  fetchJSON: async () => {
    const response = await fetch('/assets/videos/animation.json')
    return response.json()
  },
  observerCallback: async ({ element, isVisible }) => {
    if (isVisible) {
      await animation.appendLottie()
      lottie.setQuality('low')
      const player = lottie.loadAnimation({
        wrapper: element,
        animType: 'svg',
        loop: true,
        animationData: await animation.fetchJSON()
      })
      player.addEventListener('DOMLoaded', () => {
        helpers.initIsVisibleObserver({
          callback: ({ isVisible }) => isVisible ? player.play() : player.stop(),
          elements: [element],
          shallDisconnect: false
        })
      })
    }
  },
  init: () => {
    helpers.initIsVisibleObserver({
      callback: animation.observerCallback,
      elements: [document.querySelector('.animation')],
      threshold: 300
    })
  }
}

const backgroundImageLazyLoad = {
  init: () => {
    helpers.initIsVisibleObserver({
      callback: ({ element, isVisible }) => isVisible && element.removeAttribute('data-background-lazy-load'),
      elements: document.querySelectorAll('[data-background-lazy-load]'),
      threshold: 500
    })
  },
}

animation.init()
backgroundImageLazyLoad.init()
