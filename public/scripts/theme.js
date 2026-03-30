(function () {
  function getImplicitPreference() {
    var mediaQuery = '(prefers-color-scheme: dark)'
    var mql = window.matchMedia(mediaQuery)
    var hasImplicitPreference = typeof mql.matches === 'boolean'

    if (hasImplicitPreference) {
      return mql.matches ? 'dark' : 'light'
    }

    return null
  }

  function themeIsValid(theme) {
    return theme === 'light' || theme === 'dark'
  }

  // Note: These value will be replaced or used as defaults
  var themeLocalStorageKey = 'payload-theme'
  var defaultTheme = 'dark'

  var themeToSet = defaultTheme
  var preference = window.localStorage.getItem(themeLocalStorageKey)

  if (themeIsValid(preference)) {
    themeToSet = preference
  } else {
    var implicitPreference = getImplicitPreference()

    if (implicitPreference) {
      themeToSet = implicitPreference
    }
  }

  document.documentElement.setAttribute('data-theme', themeToSet)
})();
