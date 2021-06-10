import defaultSettings from '@/settings'

const title = defaultSettings.title || '大良卿'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
