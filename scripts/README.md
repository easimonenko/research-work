# Скрипты

Скрипты, описываемые ниже, позволяют загружать данные с различных сервисов,
например GitHub, NPM, и формировать сводные таблицы с нужной информацией.

В качестве вспомогательного инструмента для работы с JSON можно использовать
утилиту [jq](https://stedolan.github.io/jq/).

Для описания программного обеспечения для последующей загрузке о нём сведений из
различных сервисов здесь используются списки JSON с документами со следующими
полями:

- `name`: название программного обеспечения;
- `github-name`: полное название репозитория на GitHub;
- `npm-name`: название пакета NPM (если применимо).

Например:

``` json
[
  {
    "name": "commander",
    "github-name": "tj/commander.js",
    "npm-name": "commander"
  },
  {
    "name": "minimist",
    "github-name": "substack/minimist",
    "npm-name": "minimist"
  }
]
```

Такой список в формате JSON можно обработать с помощью `jq` и извлечь из него
нужное значение поля для дальнейшей обработки:

``` shell
jq '.[] | ."github-name"' list.json --raw-output > list.txt
```

- [get-github-repositories-info.js](get-github-repositories-info.js)
  Загружает из GitHub информацию о репозиториях. Список полных имён репозиториев
  подаётся на стандартный ввод. Полученная информация в формате JSON выдаётся на
  стандартный вывод.

  ``` shell
  cat list.txt | node get-github-repositories-info.js > repo-info.json
  ```

  Вместо передачи содержимого файла с помощью `cat` можно напрямую построить
  конвейер с предыдущей командой `jq`.

- [get-npm-packages-info.js](get-npm-packages-info.js)
  Загружает из NPM информацию о пакетах. Список имён пакетов подаётся на
  стандартный ввод. Полученная информация в формате JSON выдаётся на стандартный
  вывод.

  ``` shell
  cat list.txt | node get-npm-packages-info.js > pkg-info.json
  ```

- [github-repositories-table-generator.js](github-repositories-table-generator.js)
  Генерирует по шаблону таблицу с информацией из GitHub.

  ``` shell
  github-repositories-table-generator.js --template github-repositories-table-template.md --info github-repositories-info.json > github-repositories-table.md
  ```

- [npm-packages-table-generator.js](npm-packages-table-generator.js)
  Генерирует по шаблону таблицу с информацией из NPM.

  ``` shell
  npm-packages-table-generator.js --template npm-packages-table-template.md --info npm-packages-info.json > npm-packages-table.md
  ```

- [extract-npm-packages-list.js](extract-npm-packages-list.js)
  _Скрипт не актуален. Вспомогательный скрипт._

  На вход получает файл с описанием программного обеспечения в формате JSON и
  извлекает из него имена пакетов NPM. Результат выдаётся на стандартный вывод
  в виде простого списка строк.

  ``` shell
  node extract-npm-packages-list.js list.json > npm-list.txt
  ```

- [packages-table-generator.js](./packages-table-generator.js)
  _Скрипт не актуален, заменён несколькими другими._

  На основе списка пакетов генерирует две таблицы: одну для пакетов NPM, другую для
  репозиториев на GitHub.

  ``` shell
  node packages-table-generator.js --help
  ```

(c) 2020, Evgeny Simonenko
