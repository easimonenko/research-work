# Введение в язык запросов Cypher

Язык запросов _Cypher_ изначально разработан специально для графовой СУБД
[Neo4j](https://neo4j.com/). Целью Cypher является предоставить интуитивно
понятный, человеко читаемый язык запросов к графовым базам данных. На сегодня
Cypher поддерживается несколькими графовыми СУБД. Для стандартизации Cypher была
создана организация [openCypher](http://www.opencypher.org/).

Основы работы с СУБД Neo4j описаны в статье
[Основы работы с Neo4j в браузере](./neo4j-basics-with-browser.md), а как
установить и запустить в статье
[Установка и запуск Neo4j](./neo4j-install-and-run.md).

Для знакомства с Cypher рассмотрим пример из классического учебника по Прологу
за авторством И. Братко.

Итак, пусть мы имеем генеалогическое дерево, представленное на картинке ниже.

![Генеалогичкое дерево](./images/family_tree.png)

На Prolog это дерево можно задать так:

``` prolog
parent('pam', 'bob').
parent('tom', 'bob').
parent('tom', 'liz').
parent('kate', 'liz').
parent('bob', 'ann').
parent('mary', 'ann').
parent('bob', 'pat').
parent('dick', 'jim').
parent('ann', 'jim').
parent('jack', 'joli').
parent('pat', 'joli').
```

Посмотрим как сформировать соответствующий граф на языке Cypher:

...

## Ссылки

- [Neo4j: An Introduction to Cypher](https://neo4j.com/developer/cypher-query-language/)
- [openCypher](http://www.opencypher.org/)

---

(c) Симоненко Евгений, 2018
