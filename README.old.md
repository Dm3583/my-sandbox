# my-sandbox


Установка зависимостей

Установить в проект следующие пакеты.

npm install --save-dev prettier husky lint-staged

Интерграция плагинов

Ссылки на документацию по интеграции плагинов в популярные редакторы.

    Prettier editor integration
    ESLint editor integration

Настройки VSCode

Для комфортной работы, после установки плагинов, нужно добавить несколько настроек редактора для автосохранения и форматирования файлов.

{
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

.huskyrc
{
  "hooks": {
    "pre-commit": "lint-staged"
  }
}

.lintstagedrc
{
  "src/**/*.{json,css,scss,md}": ["prettier --write"],
  "src/**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"]
}

.prettierrc
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "proseWrap": "always"
}

.env
SASS_PATH=src;