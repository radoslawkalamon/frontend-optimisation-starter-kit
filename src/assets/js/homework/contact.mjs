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

const contact = {
  appendRecaptcha: () => {
    const scriptEl = document.createElement('script')
    scriptEl.src = 'https://www.google.com/recaptcha/api.js?render=6Lc-XPUZAAAAAOiLd3INhvxz6joup8GNDQ3Iy-uL'
    scriptEl.async = true
    document.head.appendChild(scriptEl)
  },
  setObserverForRecaptcha: () => {
    helpers.initIsVisibleObserver({
      callback: ({ isVisible }) => isVisible && contact.appendRecaptcha(),
      elements: [document.querySelector('[data-hook="contact"]')]
    })
  },
  init: () => {
    contact.setObserverForRecaptcha()
  }
}

contact.init()
