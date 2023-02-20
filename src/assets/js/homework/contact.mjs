import helpers from './_helpers.js'

const contact = {
  appendRecaptcha: () => {
    return helpers.appendScript('https://www.google.com/recaptcha/api.js?render=6Lc-XPUZAAAAAOiLd3INhvxz6joup8GNDQ3Iy-uL')
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
