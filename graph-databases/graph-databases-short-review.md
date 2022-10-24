# Краткий обзор свободно-распространяемых графовых СУБД

_Сначала полноценные СУБД в порядке числа звёзд на GitHub._

| # | Name | Repository | Stars | Query Language | Language | License | Last Commit | Created |
|:-:|------|------------|------:|:--------------:|:--------:|---------|:-----------:|:-------:|
| 1 | [Dgraph](https://dgraph.io) | [dgraph-io/dgraph](https://github.com/dgraph-io/dgraph) | 18569 | GraphQL | Go | Apache License 2.0 | 2022-10-21 | 2015-08-25 |
| 2 | [Cayley](https://cayley.io) | [cayleygraph/cayley](https://github.com/cayleygraph/cayley) | 14377 | MQL | Go | Apache License 2.0 | 2022-10-03 | 2014-06-05 |
| 3 | [SurrealDB](https://surrealdb.com) | [surrealdb/surrealdb](https://github.com/surrealdb/surrealdb) | 14057 |  | Rust | Business Source License 1.1 | 2022-10-24 | 2021-12-09 |
| 4 | [ArangoDB](https://www.arangodb.com) | [arangodb/arangodb](https://github.com/arangodb/arangodb) | 12634 | AQL | C++ | Apache License 2.0 | 2022-10-24 | 2011-10-26 |
| 5 | [Neo4j](http://neo4j.com) | [neo4j/neo4j](https://github.com/neo4j/neo4j) | 10536 | Cypher | Java | GNU General Public License v3.0 | 2022-10-20 | 2012-11-12 |
| 6 | [NebulaGraph](https://nebula-graph.io) | [vesoft-inc/nebula](https://github.com/vesoft-inc/nebula) | 8113 |  | C++ | Apache License 2.0 | 2022-10-24 | 2018-08-28 |
| 7 | [Titan](http://titandb.io) | [thinkaurelius/titan](https://github.com/thinkaurelius/titan) | 5196 | Gremlin | Java | Apache License 2.0 | 2015-12-03 | 2012-02-26 |
| 8 | [JanusGraph](https://janusgraph.org) | [JanusGraph/janusgraph](https://github.com/JanusGraph/janusgraph) | 4618 |  | Java | Apache License 2.0 | 2022-09-16 | 2016-12-26 |
| 9 | [OrientDB](http://orientdb.org) | [orientechnologies/orientdb](https://github.com/orientechnologies/orientdb) | 4517 | SQL | Java | Apache License 2.0 | 2022-10-24 | 2012-12-10 |
| 10 | FlockDB | [twitter-archive/flockdb](https://github.com/twitter-archive/flockdb) | 3298 |  | Scala | Apache License 2.0 | 2017-03-17 | 2010-04-12 |
| 11 | [TypeDB](https://vaticle.com) | [vaticle/typedb](https://github.com/vaticle/typedb) | 3224 |  | Java | GNU Affero General Public License v3.0 | 2022-10-21 | 2016-07-12 |
| 12 | [HugeGraph](https://hugegraph.apache.org) | [apache/incubator-hugegraph](https://github.com/apache/incubator-hugegraph) | 2097 |  | Java | Apache License 2.0 | 2022-10-21 | 2018-07-18 |
| 13 | [TerminusDB](https://terminusdb.com) | [terminusdb/terminusdb](https://github.com/terminusdb/terminusdb) | 2013 |  | Prolog | Apache License 2.0 | 2022-10-18 | 2019-07-23 |
| 14 | [AgensGraph](http://www.agensgraph.org) | [bitnine-oss/agensgraph](https://github.com/bitnine-oss/agensgraph) | 1213 | Cypher | C |  | 2022-09-07 | 2016-04-29 |
| 15 | [Virtuoso](http://virtuoso.openlinksw.com/dataspace/dav/wiki/Main/) | [openlink/virtuoso-opensource](https://github.com/openlink/virtuoso-opensource) | 757 |  | C | GNU General Public License v2.0 | 2022-10-19 | 2012-03-21 |
| 16 | Blazegraph | [blazegraph/database](https://github.com/blazegraph/database) | 721 | SPARQL | Java | GNU General Public License v2.0 | 2022-10-08 | 2015-12-22 |
| 17 | VertexDB | [stevedekorte/vertexdb](https://github.com/stevedekorte/vertexdb) | 294 |  | C | BSD License (3-Clause) | 2018-01-21 | 2009-06-29 |
| 18 | HGraphDB | [rayokota/hgraphdb](https://github.com/rayokota/hgraphdb) | 246 |  | Java | Apache License 2.0 | 2022-10-24 | 2016-11-09 |
| 19 | Fluree | [fluree/db](https://github.com/fluree/db) | 224 |  | Clojure | Eclipse Public License v2.0 | 2022-10-21 | 2020-10-20 |
| 20 | [ArcadeDB](https://arcadedb.com) | [ArcadeData/arcadedb](https://github.com/ArcadeData/arcadedb) | 223 |  | JavaScript | Apache License 2.0 | 2022-10-21 | 2021-08-16 |

_Примечания:_

- Cayley
  - в качестве движков хранения данных использует другие СУБД
  - сайт с документацией пуст, есть документация среди исходников на GitHub
  - предлагает несколько вариантов для хранения данных, используя другие СУБД
- ArangoDB
  - хорошая документация
  - есть пакеты для многих операционных систем
  - веб-интерфейс с графическим редактором
- Neo4j
  - ~~дополнительно поддерживается язык
    [Gremlin](https://neo4j-contrib.github.io/gremlin-plugin/)~~ (в версии 3
    поддержка полностью удалена; потребуется
    [Gremlin Server](http://tinkerpop.apache.org/))
  - дополнительно поддерживается язык
    [GraphQL](https://github.com/neo4j-contrib/neo4j-graphql)
  - дополнительно поддерживается язык
    [SPARQL](https://github.com/neo4j-contrib/sparql-plugin)
  - легко установить и легко запустить
  - веб-интерфейс с графическим редактором
  - краткий курс для ознакомления, встроенный в веб-интерфейс
- Titan
  - в качестве движков хранения данных использует другие СУБД
  - _не обновляется с 2015 года_
- OrientDB
  - в качестве основного языка запросов используется расширенный
    [SQL](http://orientdb.com/docs/last/SQL.html)
  - запустить затруднительно, требуется настройка
- FlockDB
  - _не поддерживается, новые версии не выходят с 2012 года_
  - требуется сборка из исходников
- Grakn
  - переименована в TypeDB
- AgensGraph
  - базируется на PostgreSQL
  - в качестве языков запросов доступны SQL и Cypher
  - требует сборки из исходных текстов
  - лицензия PostgreSQL
-  TerminusDB
  - лицензия сменена с GNU GPLv3 на Apache 2.0
- Blazegraph
  - имеется поддержка RDF/SPARQL и Apache TinkerPop
- VertexDB
  - требует сборки из исходных текстов
  - _нет выпусков на GitHub_
- SurrealDB
  - ожидается смена лицензии на Apache 2.0 с 2026 года

_Теперь движки для встраивания._

| # | Name | Repository | Stars | Query Language | Language | License | Last Commit | Created |
|:-:|------|------------|------:|:--------------:|:--------:|---------|:-----------:|:-------:|
| 1 | [GraphEngine](https://www.graphengine.io/) | [microsoft/GraphEngine](https://github.com/microsoft/GraphEngine) | 2069 |  | C# | MIT License | 2022-07-10 | 2017-02-09 |
| 2 | [RedisGraph](https://redis.io/docs/stack/graph/) | [RedisGraph/RedisGraph](https://github.com/RedisGraph/RedisGraph) | 1740 |  | C | Other | 2022-10-24 | 2017-03-09 |
| 3 | [Tinkerpop](https://tinkerpop.apache.org/) | [apache/tinkerpop](https://github.com/apache/tinkerpop) | 1617 |  | Java | Apache License 2.0 | 2022-10-21 | 2015-02-07 |
| 4 | Morpheus | [opencypher/morpheus](https://github.com/opencypher/morpheus) | 319 |  | Scala | Apache License 2.0 | 2020-09-09 | 2016-08-02 |
| 5 | Bitsy | [lambdazen/bitsy](https://github.com/lambdazen/bitsy) | 124 |  | Java | Apache License 2.0 | 2022-05-19 | 2017-03-16 |

_Примечания:_

- GraphEngine
  - не является СУБД, это движок для .Net и Visual Studio
  - _нет выпусков на GitHub_
- Tinkerpop
  - это скорее язык запросов к графовым СУБД, нежели движок
- RedisGraph
  - является модулем для Redis
  - требует сборки из исходных текстов
  - лицензия: Redis Source Available License
- Redis Graph (obsolete)
  - <http://redisgraph.io/>
  - <https://github.com/swilly22/redis-graph>
  - 405 звёзд на GitHub
  - написана на C
  - является модулем для Redis
  - требует сборки из исходных текстов
  - _нет выпусков на GitHub_
  - не видно активной разработки с июня 2018
  - репозиторий заархивирован, автор рекомендует <https://github.com/RedisGraph/RedisGraph>
  - лицензия: AGPL 3.0
- Morpheus (Cypher for Apache Spark)
- ранее <https://github.com/opencypher/cypher-for-apache-spark>
- является дополнением к Apache Spark
- Bitsy v3
  - встраиваемая СУБД
  - не видно активной разработки с июля 2019
  - лицензия: Apache 2.0
- Bitsy v2
  - <https://bitbucket.org/lambdazen/bitsy/wiki/Home>
  - <https://bitbucket.org/lambdazen/bitsy>
  - написана на Java
  - встраиваемая СУБД
  - _не обновляется с 2016 года_
  - лицензия: Apache 2.0

## Обновления

### 2022-10-24

- За два с половиной года произошли существенные передвижки:
  - Появилось три новичка, и ещё одна СУБД добавлена в рейтинг.
  - _Dgraph_ обошёл _Cayley_ и занимает теперь первую строчку.
  - Третью строчку занял новичёк 2021 года _SurrealDB_.
  - Популярная _Neo4j_ переместилась на одну строку ниже, на пятую.
  - Как впрочем и популярная _ArangoDB_.
  - Два других новичка рейтинга занимают лишь последние два места.
  - Остальные занимают примерно те же места, что и ранее.
- Добавлены СУБД _Fluree_, _SurrealDB_, _ArcadeDB_.
- _Grakn_ и _Grakn Labs_ переименованы в _TypeDB_ и _Vaticle_, соответственно.
- _HugeGraph_ переехал в Apache Incubator.
- Обновлены ссылки (в том числе и для Grakn / TypeDB, HugeGraph).
- Добавлена колонка "Язык запросов".
- Усовершенствовано определение лицензии.

### 2020-05-07

- Обзор теперь представлен в виде сводных таблиц. Таблица генерируется с
  использованием скриптов из раздела [scripts](../scripts).
- JanusGraph обошёл FlockDB.
- В таблицах расширенный список графовых СУБД. Добавлены раннее не
  рассматривавшиеся.

### 2020-02-23

- Добавлена JanusGraph.
- Добавлена RedisGraph (как продолжение заархивированной Redis Graph).

### 2019-12-31

Этот обзор не обновлялся больше года. Из существенного:

- Добавлена Dgraph; интересно, что эта СУБД опережает по числу звезд такие
  фавориты как ArangoDB и Neo4j.
- Возродилась Blazegraph; в принципе, новый выпуск был сделан ещё в марте 2018, но
  за год она обошла по звёздам VertexDB.
- Не видно активной разработки Redis Graph.
- Cypher for Apache Spark переименован в Morpheus.
- Возродилась Bitsy v3.

---

(c) Симоненко Евгений, 2017-2020
