const helpers = {
  initIsVisibleObserver: ({ callback, elements, shallUnobserve = true, threshold = 0 }) => {
    let unobservedCount = 0

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          callback({ element: entry.target, isVisible: entry.isIntersecting })
          shallUnobserve && entry.isIntersecting && observer.unobserve(entry.target) && unobservedCount++
          elements.length === unobservedCount && observer.disconnect()
        })
      },
      {
        rootMargin: `${threshold}px 0px`
      }
    )
    elements.forEach(el => observer.observe(el))
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
      elements: [document.querySelector('.animation')]
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
