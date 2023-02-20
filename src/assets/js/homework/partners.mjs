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
      window.player = player
      player.addEventListener('DOMLoaded', () => {
        helpers.initIsVisibleObserver({
          callback: ({ isVisible }) => isVisible ? player.play() : player.stop(),
          elements: [element],
          shallDisconnect: false
        })
      })
    }
  },
  createPoster: () => {
    const el = document.createElement('img')
    el.ariaHidden = true
    el.src = '/assets/images/homework/partners-animation-poster.webp'
    el.decoding = 'async'
    el.loading = 'lazy'
    el.alt = ''
    el.style.aspectRatio = '1 / 1'
    return el
  },
  init: async () => {
    const element = document.querySelector('.animation')
    const { level } = await navigator.getBattery()
    const cpuCount = navigator.hardwareConcurrency
    const shallStartAnimation = cpuCount >= 4 && level >= 0.2

    if (shallStartAnimation) {
      helpers.initIsVisibleObserver({
        callback: animation.observerCallback,
        elements: [element],
        threshold: 300
      })
    } else {
      element.appendChild(animation.createPoster())
    }
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
