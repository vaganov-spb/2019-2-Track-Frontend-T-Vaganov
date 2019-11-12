// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
  extends: ['@wemake-services/stylelint-config-scss', 'stylelint-config-css-modules', 'stylelint-a11y/recommended'],
  plugins: ['stylelint-a11y'],

  rules: {
    // ignore special `var-` css variables for `:export`
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/^var-/'],
      },
    ],

    // custom plugins to work with

    // a11y
    'a11y/content-property-no-static-value': true,
    'a11y/media-prefers-reduced-motion': null,
    'scale-unlimited/declaration-strict-value': ['/color/', 'fill', 'stroke'],
    'plugin/no-low-performance-animation-properties': null,
    'plugin/stylelint-no-indistinguishable-colors': null,
    'a11y/selector-pseudo-class-focus': null,
    'color-format/format': null,
    'color-named': null,
    'color-hex-length': null,
    'color-hex-case': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'csstools/use-nesting': null,
    'order/order': null,
    'custom-property-empty-line-before': null,
    'declaration-colon-space-after': null,
  },
}
