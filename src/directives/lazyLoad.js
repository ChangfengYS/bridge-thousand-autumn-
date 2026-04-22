const lazyLoadDirective = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = binding.value
            
            if (src) {
              img.src = src
              img.classList.add('lazy-loaded')
            }
            
            observer.unobserve(img)
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )
    
    el._observer = observer
    observer.observe(el)
  },
  
  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect()
    }
  },
  
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      const src = binding.value
      if (src && el._observer) {
        el.src = ''
        el.classList.remove('lazy-loaded')
        el._observer.observe(el)
      }
    }
  }
}

export const lazyLoad = {
  install(app) {
    app.directive('lazy', lazyLoadDirective)
  }
}

export default lazyLoadDirective
