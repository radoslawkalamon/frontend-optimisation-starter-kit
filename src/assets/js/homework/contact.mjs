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
      element: document.querySelector('[data-hook="contact"]')
    })
  },
  init: () => {
    contact.setObserverForRecaptcha()
  }
}

contact.init()
