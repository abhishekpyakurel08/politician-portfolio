export function InitTheme() {
  return (
    <script
      suppressHydrationWarning
      id="theme-initializer"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var theme = 'light';
            try {
              var storedTheme = localStorage.getItem('payload-theme');
              if (storedTheme) {
                theme = storedTheme;
              } else {
                var mql = window.matchMedia('(prefers-color-scheme: dark)');
                if (mql.matches) theme = 'dark';
              }
            } catch (e) {}
            document.documentElement.setAttribute('data-theme', theme);
            document.documentElement.style.colorScheme = theme;
          })();
        `,
      }}
    />
  )
}
