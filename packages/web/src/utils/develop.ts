export function gridSystem() {
  const addStyle = document.createElement('style')

  const body = []

  body.push(
    'body::before {' +
      "content: '--';" +
      'position: fixed;' +
      'bottom: 0px;' +
      'right: 0px;' +
      'z-index: 9999999;' +
      'background-color: #222222;' +
      'color: #eeeeee;' +
      'padding: 8px 8px;' +
      'width: 36px;' +
      'text-align: center;' +
      '}' +
      '@media (min-width: 576px) {' +
      '  body::before {' +
      "    content: 'sm';" +
      '  }' +
      '}' +
      '@media (min-width: 768px) {' +
      '  body::before {' +
      "    content: 'md';" +
      '  }' +
      '}' +
      '@media (min-width: 992px) {' +
      '  body::before {' +
      "    content: 'lg';" +
      '  }' +
      '}' +
      '@media (min-width: 1200px) {' +
      '  body::before {' +
      "    content: 'xl';" +
      '  }' +
      '}'
  )
  addStyle.innerHTML = body.join('')
  document.body.appendChild(addStyle)
}
