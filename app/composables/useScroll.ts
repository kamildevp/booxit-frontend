export function useScroll(threshold = 100) {
  const scrollDir = ref(false)
  let lastScroll = 0

  const updateScrollDir = () => {
    const current = window.scrollY
    if (current > lastScroll && current > threshold) {
      scrollDir.value = true
    }
    else {
      scrollDir.value = false
    }
    lastScroll = current
  }

  onMounted(() => window.addEventListener('scroll', updateScrollDir))
  onUnmounted(() => window.removeEventListener('scroll', updateScrollDir))

  return { scrollDir }
}
