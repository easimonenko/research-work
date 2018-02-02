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

``` cypher
CREATE (pam:Person {name: "Pam"}),
  (tom:Person {name: "Tom"}),
  (kate:Person {name: "Kate"}),
  (mary:Person {name: "Mary"}),
  (bob:Person {name: "Bob"}),
  (liz:Person {name: "Liz"}),
  (dick:Person {name: "Dick"}),
  (ann:Person {name: "Ann"}),
  (pat:Person {name: "Pat"}),
  (jack:Person {name: "Jack"}),
  (jim:Person {name: "Jim"}),
  (joli:Person {name: "Joli"}),
  (pam)-[:PARENT]->(bob),
  (tom)-[:PARENT]->(bob),
  (tom)-[:PARENT]->(liz),
  (kate)-[:PARENT]->(liz),
  (mary)-[:PARENT]->(ann),
  (bob)-[:PARENT]->(ann),
  (bob)-[:PARENT]->(pat),
  (dick)-[:PARENT]->(jim),
  (ann)-[:PARENT]->(jim),
  (pat)-[:PARENT]->(joli),
  (jack)-[:PARENT]->(joli)
```

Получилось несколько многословней, чем на Prolog, однако и структура узлов здесь
сложней. На Prolog мы также могли наших персон представить в виде такой же
точно структуры, но здесь мы изучаем не Prolog, поэтому оставим это.
Хочу также заметить, что синтаксис Prolog традиционно у многих вызывает
затруднение в понимании смысла записи `parent`, и новичкам нужно объяснять, что
запись `parent('pam', 'bob').` следует читать, как "pam is parent of bob".
Синтаксис связи Cypher на мой взгляд очевидней.

Итак, Neo4j нам сообщил, что
`Added 12 labels, created 12 nodes, set 12 properties, created 11 relationships, completed after 9 ms.`
Посмотрим, что у нас получилось:

``` cypher
MATCH (p:Person) RETURN p
```

![Генеалогичкое дерево в Neo4j](./images/neo4j_family_tree.png)

Никто не запрещает нам отредактировать внешний вид получившегося графа:

![Генеалогичкое дерево в Neo4j, отредактированный вид](./images/neo4j_family_tree_edited_view.png)

...

## Удаление узлов и связей

Для удаления всех наших персон, можно выполнить запрос:

``` cypher
MATCH (p:Person) DELETE p
```

Однако, Neo4j нам сообщит, что нельзя удалить узлы, у которых есть связи.
Поэтому удалим сначала связи и затем повторим удаление узлов:

``` cypher
MATCH (p1:Person)-[r]->(p2:Person) DELETE r
```

Поясним, что мы сейчас сделали: сопоставили две персоны, между которыми есть
связь, поименовали эту связь как `r` и затем удалили её.

## Ссылки

- [Neo4j: An Introduction to Cypher](https://neo4j.com/developer/cypher-query-language/)
- [openCypher](http://www.opencypher.org/)

---

(c) Симоненко Евгений, 2018
