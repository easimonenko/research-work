# Введение в язык запросов Cypher с параллельным кодом на Prolog

В статье рассматривается язык запросов Cypher графовой СУБД Neo4j в сравнении
с языком Prolog, что может быть полезно тем, кто уже знаком с Prolog, но ещё
только приступает к изучению Cypher.

## Введение

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

## Генеалогическое дерево

Итак, пусть мы имеем генеалогическое дерево, представленное на картинке ниже.

![Генеалогичкое дерево](./images/family_tree.png)

На Prolog это дерево можно задать так:

``` prolog
parent('Pam', 'Bob').
parent('Tom', 'Bob').
parent('Tom', 'Liz').
parent('Kate', 'Liz').
parent('Bob', 'Ann').
parent('Mary', 'Ann').
parent('Bob', 'Pat').
parent('Dick', 'Jim').
parent('Ann', 'Jim').
parent('Jack', 'Joli').
parent('Pat', 'Joli').
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
запись `parent('Pam', 'Bob').` следует читать, как "`Pam` is `parent` of `Bob`",
или по русски "`Pam` -- `родитель` для `Bob`'а". Синтаксис связи на Cypher на
мой взгляд очевидней.

Итак, Neo4j нам сообщил, что
`Added 12 labels, created 12 nodes, set 12 properties, created 11 relationships, completed after 9 ms.`
Посмотрим, что у нас получилось:

``` cypher
MATCH (p:Person) RETURN p
```

![Генеалогическое дерево в Neo4j](./images/neo4j_family_tree.png)

Никто не запрещает нам отредактировать внешний вид получившегося графа:

![Генеалогическое дерево в Neo4j, отредактированный вид](./images/neo4j_family_tree_edited_view.png)

## Задаём вопросы

Что с этим можно делать? Можно убедиться в том, что, например, Pam является
родителем Bob'а. На Prolog мы бы это записали просто:

``` prolog
parent('Pam','Bob').
```

На Cypher так:

``` cypher
MATCH ans = (:Person {name: "Pam"})-[:PARENT]->(:Person {name: "Bob"})
RETURN ans
```

Мы получили соответствующий подграф:

![Pam is parent of Bob](./images/pam-parent-bob.png)

Однако это не совсем то, что нам надо. Изменим запрос:

``` cypher
MATCH ans = (:Person {name: "Pam"})-[:PARENT]->(:Person {name: "Bob"})
RETURN ans IS NOT NULL
```

Теперь в ответ получаем `true`. А если спросим:

``` cypher
MATCH ans = (:Person {name: "Pam"})-[:PARENT]->(:Person {name: "Liz"})
RETURN ans IS NOT NULL
```

То ничего не получим... Здесь нужно добавить слово `OPTIONAL`, тогда если
результат будет пуст, то будет возвращаться `null`:

``` cypher
OPTIONAL MATCH ans = (:Person {name: "Pam"})-[:PARENT]->(:Person {name: "Liz"})
RETURN ans IS NOT NULL
```

Теперь получаем ожидаемый ответ `false`.

Далее, можно посмотреть, кто кому является родителем. В Prolog это делается
просто:

``` prolog
parent(X,Y).
```

Как обычно на Cypher это запишется более многословно, но достаточно очевидно:

``` cypher
MATCH (p1:Person)-[:PARENT]->(p2:Person) RETURN p1, p2
```

Откроем вкладку результата с надписью `Text` и увидим таблицу с двумя колонками:

``` plain
╒═══════════════╤═══════════════╕
│"p1"           │"p2"           │
╞═══════════════╪═══════════════╡
│{"name":"Pam"} │{"name":"Bob"} │
├───────────────┼───────────────┤
│{"name":"Tom"} │{"name":"Bob"} │
├───────────────┼───────────────┤
│{"name":"Tom"} │{"name":"Liz"} │
├───────────────┼───────────────┤
│{"name":"Kate"}│{"name":"Liz"} │
├───────────────┼───────────────┤
│{"name":"Mary"}│{"name":"Ann"} │
├───────────────┼───────────────┤
│{"name":"Bob"} │{"name":"Ann"} │
├───────────────┼───────────────┤
│{"name":"Bob"} │{"name":"Pat"} │
├───────────────┼───────────────┤
│{"name":"Dick"}│{"name":"Jim"} │
├───────────────┼───────────────┤
│{"name":"Ann"} │{"name":"Jim"} │
├───────────────┼───────────────┤
│{"name":"Pat"} │{"name":"Joli"}│
├───────────────┼───────────────┤
│{"name":"Jack"}│{"name":"Joli"}│
└───────────────┴───────────────┘
```

Мило, что ещё мы можем узнать? Мы можем узнать, кто является родителем
конкретного члена рода, например, для Bob'а:

``` prolog
parent(X,'Bob').
```

``` cypher
MATCH (parent:Person)-[:PARENT]->(:Person {name: "Bob"}) RETURN parent.name
```

``` plain
╒═════════════╕
│"parent.name"│
╞═════════════╡
│"Tom"        │
├─────────────┤
│"Pam"        │
└─────────────┘
```

Также можем узнать, кто дети Bob'а:

``` prolog
parent('Bob',Y).
```

``` cypher
MATCH (:Person {name: "Bob"})-[:PARENT]->(child:Person) RETURN child.name
```

``` plain
╒════════════╕
│"child.name"│
╞════════════╡
│"Ann"       │
├────────────┤
│"Pat"       │
└────────────┘
```

Ещё мы можем поинтересоваться, у кого есть дети:

``` prolog
parent(X,_).
```

``` cypher
MATCH (parent:Person)-[:PARENT]->(:Person) RETURN parent.name
```

``` plain
╒═════════════╕
│"parent.name"│
╞═════════════╡
│"Pam"        │
├─────────────┤
│"Tom"        │
├─────────────┤
│"Tom"        │
├─────────────┤
│"Kate"       │
├─────────────┤
│"Mary"       │
├─────────────┤
│"Bob"        │
├─────────────┤
│"Bob"        │
├─────────────┤
│"Dick"       │
├─────────────┤
│"Ann"        │
├─────────────┤
│"Pat"        │
├─────────────┤
│"Jack"       │
└─────────────┘
```

Хм, Tom и Bob встретились по два раза (с Prolog будет та же проблема), исправим
это:

``` cypher
MATCH (parent:Person)-[:PARENT]->(:Person) RETURN DISTINCT parent.name
```

Мы добавили в возвращаемый результат запроса слово `DISTINCT`, по смыслу
аналогичное таковому в SQL.

``` plain
╒═════════════╕
│"parent.name"│
╞═════════════╡
│"Pam"        │
├─────────────┤
│"Tom"        │
├─────────────┤
│"Kate"       │
├─────────────┤
│"Mary"       │
├─────────────┤
│"Bob"        │
├─────────────┤
│"Dick"       │
├─────────────┤
│"Ann"        │
├─────────────┤
│"Pat"        │
├─────────────┤
│"Jack"       │
└─────────────┘
```

Можно также заметить, что Neo4j возвращает нам родителей в порядке их ввода
в запросе `CREATE`.

Давайте теперь спросим, кто является дедушкой или бабушкой. На Prolog это
записывается довольно просто:

``` prolog
grandparent(X, Y):-parent(X, Z),parent(Z,Y).
```

Но и на Cypher не намного сложней:

``` cypher
MATCH (grandparent:Person)-[:PARENT]->()-[:PARENT]->(:Person)
RETURN DISTINCT grandparent.name
```

Отлично, всё так и есть:

``` plain
╒══════════════════╕
│"grandparent.name"│
╞══════════════════╡
│"Tom"             │
├──────────────────┤
│"Pam"             │
├──────────────────┤
│"Bob"             │
├──────────────────┤
│"Mary"            │
└──────────────────┘
```

Небольшое пояснение: в нашем шаблоне запроса мы использовали промежуточный
безымянный узел `()` и две связи типа `PARENT`.

Выясним теперь кто является отцом. Отцом является мужчина, у которого есть
ребёнок. Таким образом, нам не хватает данных о том, кто является мужчиной.
Соответственно, для определения, кто является мамой, потребуется знать кто
является женщиной. Добавим соответствующие сведения в наши базы данных. Сначала
на Prolog:

``` prolog
male('Tom').
male('Dick').
male('Bob').
male('Jim').
male('Jack').
female('Pam').
female('Kate').
female('Mary').
female('Liz').
female('Ann').
female('Pat').
female('Joli').
```

Здесь всё просто. На Cypher мы присвоим метки `Male` и `Female` уже существующим
узлам.

``` cypher
MATCH (p:Person)
WHERE p.name IN ["Tom", "Dick", "Bob", "Jim", "Jack"]
SET p:Male
```

``` cypher
MATCH (p:Person)
WHERE p.name IN ["Pam", "Kate", "Mary", "Liz", "Ann", "Pat", "Joli"]
SET p:Female
```

Поясним, что мы здесь сделали: выбрали все узлы с меткой `Person`, проверили их
свойство `name` по заданному списку, задаваемому в квадратных скобках, и
присвоили подходящим узлам метку `Male` или `Female` соответственно.

Проверим:

``` cypher
MATCH (p:Person) WHERE p:Male RETURN p.name
```

``` plain
╒════════╕
│"p.name"│
╞════════╡
│"Tom"   │
├────────┤
│"Bob"   │
├────────┤
│"Dick"  │
├────────┤
│"Jack"  │
├────────┤
│"Jim"   │
└────────┘
```

``` cypher
MATCH (p:Person) WHERE p:Female RETURN p.name
```

``` plain
╒════════╕
│"p.name"│
╞════════╡
│"Pam"   │
├────────┤
│"Kate"  │
├────────┤
│"Mary"  │
├────────┤
│"Liz"   │
├────────┤
│"Ann"   │
├────────┤
│"Pat"   │
├────────┤
│"Joli"  │
└────────┘
```

Поясним: мы запросили все узлы с меткой `Person`, у которой есть также метка
`Male` или `Female` соответственно. Но мы могли бы составить наши запросы
несколько иначе:

``` cypher
MATCH (p:Person:Male) RETURN p.name
MATCH (p:Person:Female) RETURN p.name
```

А ещё давайте ещё раз взглянем на наш граф визуально:

![Генеалогическое дерево с метками Male и Female](./images/neo4j-family-tree-male-female.png)

Neo4j Browser раскрасил узлы в два разных цвета в соответствии с метками Male и
Female.

Отлично, теперь мы можем запросить из базы данных всех отцов:

``` prolog
father(X,Y):-male(X),parent(X,Y).
```

``` cypher
MATCH (p:Person:Male)-[:PARENT]->(:Person) RETURN DISTINCT p.name
```

``` plain
╒════════╕
│"p.name"│
╞════════╡
│"Tom"   │
├────────┤
│"Bob"   │
├────────┤
│"Dick"  │
├────────┤
│"Jack"  │
└────────┘
```

И матерей:

``` prolog
mother(X,Y):-female(X),parent(X,Y).
```

``` cypher
MATCH (p:Person:Female)-[:PARENT]->(:Person) RETURN DISTINCT p.name
```

``` plain
╒════════╕
│"p.name"│
╞════════╡
│"Pam"   │
├────────┤
│"Kate"  │
├────────┤
│"Mary"  │
├────────┤
│"Ann"   │
├────────┤
│"Pat"   │
└────────┘
```

Давайте теперь сформулируем отношения брат и сестра. X является братом для Y,
если он мужчина и для X и Y имеется хотя бы один общий родитель. (Аналогично для
отношения сестра.) На Prolog это выглядит так:

``` prolog
brother(X,Y):-male(X),parent(Z,X),parent(Z,Y),X\=Y.
sister(X,Y):-female(X),parent(Z,X),parent(Z,Y),X\=Y.
```

Отношение брат на Cypher:

``` cypher
MATCH (brother:Person:Male)<-[:PARENT]-()-[:PARENT]->(p:Person)
RETURN brother.name, p.name
```

``` plain
╒══════════════╤════════╕
│"brother.name"│"p.name"│
╞══════════════╪════════╡
│"Bob"         │"Liz"   │
└──────────────┴────────┘
```

Отношение сестра на Cypher:

``` cypher
MATCH (sister:Person:Female)<-[:PARENT]-()-[:PARENT]->(p:Person)
RETURN sister.name, p.name
```

``` plain
╒═════════════╤════════╕
│"sister.name"│"p.name"│
╞═════════════╪════════╡
│"Liz"        │"Bob"   │
├─────────────┼────────┤
│"Ann"        │"Pat"   │
├─────────────┼────────┤
│"Pat"        │"Ann"   │
└─────────────┴────────┘
```

Важно заметить, что для Cypher мы не накладывали дополнительного условия как для
Prolog, чтобы никакой мужчина не был самому себе братом, и аналогично -- сестра.

Итак, мы можем узнавать кто чей родитель, а также кто чей дедушка или бабушка. А
как быть с предками более дальними? С прадедушками, прапрадедушками или так
далее? Не будем же мы для каждого такого случая писать соответствующее правило,
да и всё проблематичней это будет с каждым разом. На самом деле всё просто: X
является для Y предком, если он является предком для родителя Y. Как это
записать на Prolog? Ответ: с использованием рекурсии.

``` prolog
predecessor(X,Y):-parent(X,Y).
predecessor(X,Y):-parent(X,Z),predecessor(Z,Y).
```

А как же нам описать подобное на Cypher?

Cypher предоставляет паттерн `*`, позволяющий потребовать последовательность
связей любой длины:

``` cypher
MATCH (p:Person)-[*]->(s:Person) RETURN DISTINCT p.name, s.name
```

Есть в этом правда одна проблема: это будут любые связи. Добавим указание на
связь `PARENT`:

``` cypher
MATCH (p:Person)-[:PARENT*]->(s:Person) RETURN DISTINCT p.name, s.name
```

Чтобы не увеличивать длину статьи, найдём всех предков `Joli`:

``` cypher
MATCH (p:Person)-[:PARENT*]->(:Person {name: "Joli"}) RETURN DISTINCT p.name
```

``` plain
╒════════╕
│"p.name"│
╞════════╡
│"Jack"  │
├────────┤
│"Pat"   │
├────────┤
│"Bob"   │
├────────┤
│"Pam"   │
├────────┤
│"Tom"   │
└────────┘
```

Рассмотрим более сложное правило для выяснения кто кому является родственником.
Во-первых, родственниками являются предки и потомки, например, сын и мать,
бабушка и внук. Во-вторых, родственниками являются братья и сёстры в том числе
двоюродные, троюродные и так далее, что в терминах предков означает, что у них
общий предок. И, в-третьих, родственниками считаются те, у кого общие потомки,
например, муж и жена. На Prolog для определения первого правила будем
использовать дизъюнкцию (логическое ИЛИ), которая обозначается символом «;»
(точка с запятой).

``` prolog
relative(X,Y):-predecessor(X,Y);predecessor(Y,X).
relative(X,Y):-predecessor(Z,X),predecessor(Z,Y),X\=Y.
relative(X,Y):-predecessor(X,Z),predecessor(Y,Z),X\=Y.
```

На Cypher для множества паттернов нужно воспользоваться `UNION`:

``` cypher
MATCH (r1:Person)-[:PARENT*]-(r2:Person)
RETURN DISTINCT r1.name, r2.name
UNION
MATCH (r1:Person)<-[:PARENT*]-(:Person)-[:PARENT*]->(r2:Person)
RETURN DISTINCT r1.name, r2.name
UNION
MATCH (r1:Person)-[:PARENT*]->(:Person)<-[:PARENT*]-(r2:Person)
RETURN DISTINCT r1.name, r2.name
```

Первое правило удалось сформулировать даже короче чем на Prolog за счёт
связи, направление которой нам неважно. Указывается такая связь без стрелки,
просто тире `-`. Второе и третье правило записаны очевидным, уже знакомым
образом.

Мы не будем здесь приводить результат тотального запроса, скажем только то, что
найденных пар родственников 132, что согласуется с вычисленным значением как
число упорядоченных пар из 12. Мы могли бы также конкретизировать данный запрос,
заменив вхождение переменной `r1` или `r2` на `(:Person {name: "Liz"})` к
примеру, однако в нашем случае в этом нет большого смысла, так как все персоны
в нашей базе данных очевидно являются родственниками.

На этом мы закончим рассматривать выявление связей между персонами в нашей базе
данных. Другие родственные отношения предлагается рассмотреть в качестве
упражнений. Решения также приведены.

На последок рассмотрим как удалять узлы и связи.

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

## Упражнения

1. сын и дочь;
2. дедушка и бабушка;
3. внук и внучка;
4. дядя и тётя;
5. муж и жена;
6. свёкор и свекровь;
7. тесть и тёща;
8. отчим и мачеха;
9. свояк и свояченица;
10. двоюродный брат и сестра.

## Ответы

1. сын и дочь:
  ``` cypher
  MATCH (s:Person:Male)<-[:PARENT]-(p:Person) RETURN s.name, p.name
  MATCH (s:Person:Female)<-[:PARENT]-(p:Person) RETURN s.name, p.name
  ```
2. дедушка и бабушка:
  ``` cypher
  MATCH (gf:Person:Male)-[:PARENT]->()-[:PARENT]->(gs:Person) RETURN gf.name, gs.name
  MATCH (gm:Person:Female)-[:PARENT]->()-[:PARENT]->(gs:Person) RETURN gm.name, gs.name
  ```
3. внук и внучка:
  ``` cypher
  MATCH (gs:Person:Male)<-[:PARENT]-()<-[:PARENT]-(g:Person) RETURN gs.name, g.name
  MATCH (gd:Person:Female)<-[:PARENT]-()<-[:PARENT]-(g:Person) RETURN gd.name, g.name
  ```
4. дядя и тётя:
  ``` cypher
  MATCH (u:Person:Male)<-[:PARENT]-(:Person)-[:PARENT]->(:Person)-[:PARENT]->(n:Person)
  RETURN u.name, n.name
  ```
  ``` cypher
  MATCH (a:Person:Female)<-[:PARENT]-(:Person)-[:PARENT]->(:Person)-[:PARENT]->(n:Person)
  RETURN a.name, n.name
  ```
5. муж и жена:
  ``` cypher
  MATCH (h:Person:Male)-[:PARENT]->(:Person)<-[:PARENT]-(w:Person:Female)
  RETURN h.name, w.name
  ```
  ``` cypher
  MATCH (w:Person:Female)-[:PARENT]->(:Person)<-[:PARENT]-(h:Person:Male)
  RETURN w.name, h.name
  ```
6. свёкр и свекровь:
  ``` cypher
  MATCH (f:Person:Male)-[:PARENT]->(:Person:Male)-[:PARENT]->(:Person)<-[:PARENT]-(w:Person:Female)
  RETURN f.name, w.name
  ```
  ``` cypher
  MATCH (m:Person:Female)-[:PARENT]->(:Person:Male)-[:PARENT]->(:Person)<-[:PARENT]-(w:Person:Female)
  RETURN m.name, w.name
  ```
7. тесть и тёща:
  ``` cypher
  MATCH (f:Person:Male)-[:PARENT]->(:Person:Female)-[:PARENT]->(:Person)<-[:PARENT]-(h:Person:Male)
  RETURN f.name, h.name
  ```
  ``` cypher
  MATCH (m:Person:Female)-[:PARENT]->(:Person:Female)-[:PARENT]->(:Person)<-[:PARENT]-(h:Person:Male)
  RETURN m.name, h.name
  ```
8. отчим (муж мамы, но не отец) и мачеха (жена папы, но не мама):
  ``` cypher
  MATCH (h:Person:Male)-[:PARENT]->(:Person)<-[:PARENT]-(m:Person:Female)-[:PARENT]->(s:Person)
  WHERE NOT (h)-[:PARENT]->(s)
  RETURN h.name, s.name
  ```
  ``` cypher
  MATCH (w:Person:Female)-[:PARENT]->(:Person)<-[:PARENT]-(f:Person:Male)-[:PARENT]->(s:Person)
  WHERE NOT (w)-[:PARENT]->(s)
  RETURN w.name, s.name
  ```
9. свояк и свояченица:
  ``` cypher
  MATCH (b:Person:Male)<-[:PARENT]-(:Person)-[:PARENT]->(:Person)-[:PARENT]->(:Person)<-[:PARENT]-(p:Person)
  RETURN b.name, p.name
  ```
  ``` cypher
  MATCH (s:Person:Female)<-[:PARENT]-(:Person)-[:PARENT]->(:Person)-[:PARENT]->(:Person)<-[:PARENT]-(p:Person)
  RETURN s.name, p.name
  ```
10. двоюродный брат и сестра:
  ``` cypher
  MATCH (b:Person:Male)<-[:PARENT]-(:Person)<-[:PARENT]-(:Person)-[:PARENT]->(:Person)-[:PARENT]->(p:Person)
  RETURN b.name, p.name
  ```
  ``` cypher
  MATCH (s:Person:Female)<-[:PARENT]-(:Person)<-[:PARENT]-(:Person)-[:PARENT]->(:Person)-[:PARENT]->(p:Person)
  RETURN s.name, p.name
  ```

## Заключение

В статье на простом примере социального графа показано, как использовать
возможности языка запросов Cypher. Также каждый пример сопровождается решением
на языке Prolog, что позволяет сравнить два разных подхода к составлению
запросов к базе данных социального графа. Более подробная информация о языке
Cypher может быть найдена по ссылкам ниже.

## Ссылки

- [Neo4j: An Introduction to Cypher](https://neo4j.com/developer/cypher-query-language/)
- [Neo4j Cypher Refcard](https://neo4j.com/docs/cypher-refcard/current/)
- [openCypher](http://www.opencypher.org/)
- [SWI-Prolog](http://swi-prolog.org/)

## Библиография

- Робинсон Ян, Вебер Джим, Эифрем Эмиль. Графовые базы данных. Новые возможности
  для работы со связанными данными / пер. с англ. – 2-е изд. – М.: ДМК-Пресс,
  2016 – 256 с.
- Братко И. Программирование на языке Пролог для искусственного интеллекта:
  пер. с англ. – М.: Мир, 1990. – 560 с.: ил.
- Братко И. Алгоритмы искусственного интеллекта на языке PROLOG, 3-е издание.:
  пер. с англ. – М.: ИД «Вильямс», 2004. – 640 с.: ил.

---

(c) Симоненко Евгений, 2018
