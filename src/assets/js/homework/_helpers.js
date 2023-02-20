export default {
  appendScript: (url) => new Promise((resolve, reject) => {
    const scriptEl = document.createElement('script')
    scriptEl.src = url
    scriptEl.async = true
    scriptEl.onload = () => resolve()
    document.head.appendChild(scriptEl)
  }),
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
