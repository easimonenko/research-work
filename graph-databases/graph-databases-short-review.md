# Краткий обзор свободно-распространяемых графовых СУБД

## Обновления

### 2020-02-23

- Добавлена JanusGraph.
- Добавлена RedisGraph (как продолжение заархивированной Redis Graph).

### 2019-12-31

Этот обзор не обновлялся больше года. Из существенного:

- Добавлена Dgraph; интересно, что эта СУБД опережает по числу звезд такие фавориты как ArangoDB и Neo4j.
- Возродилась Blazegraph; в принципе, новый выпуск был сделан ещё в марте 2018, но за год она обошла по звёздам VertexDB.
- Не видно активной разработки Redis Graph.
- Cypher for Apache Spark переименован в Morpheus.
- Возродилась Bitsy v3.

_Сначала полноценные СУБД в порядке числа звёзд на GitHub._

## Cayley

- <https://www.cayley.io/>
- <https://github.com/cayleygraph/cayley>
- версия: 0.7.7
- 13203 звёзд на GitHub
- написана на Go
- в качестве языков запросов доступны JavaScript и
  [MQL](https://ru.wikipedia.org/wiki/MQL)
- в качестве движков хранения данных использует другие СУБД
- сайт с документацией пуст, есть документация среди исходников на GitHub
- предлагает несколько вариантов для хранения данных, используя другие СУБД
- при запуске рухнула, сославшись на то, что не были найдены какие-то assets в
  Go workspace
- лицензия: Apache 2.0

## Dgraph

- <https://dgraph.io/>
- <https://github.com/dgraph-io/dgraph>
- версия: 1.2.1 и 2.0.0-rc1
- 12500 звёзд на GitHub
- написана на Go
- язык запросов GraphQL
- лицензия: Apache 2.0 и собственная

## ArangoDB

- <https://www.arangodb.com/>
- <https://github.com/arangodb/arangodb>
- версия: 3.6.1
- 9255 звёзд на GitHub
- написана на C++
- язык запросов [AQL](https://docs.arangodb.com/latest/AQL/index.html)
- хорошая документация
- есть пакеты для многих операционных систем
- веб-интерфейс с графическим редактором
- лицензия: Apache 2.0

## Neo4j

- <https://neo4j.com/>
- <https://github.com/neo4j/neo4j>
- версия: 3.5.15 и 4.0.0
- 7450 звезд на GitHub
- написана на Java
- язык запросов [Cypher](http://www.opencypher.org/)
- ~~дополнительно поддерживается язык
  [Gremlin](https://neo4j-contrib.github.io/gremlin-plugin/)~~ (в версии 3 поддержка полностью удалена; потребуется [Gremlin Server](http://tinkerpop.apache.org/))
- дополнительно поддерживается язык
  [GraphQL](https://github.com/neo4j-contrib/neo4j-graphql)
- дополнительно поддерживается язык
  [SPARQL](https://github.com/neo4j-contrib/sparql-plugin)
- легко установить и легко запустить
- веб-интерфейс с графическим редактором
- краткий курс для ознакомления, встроенный в веб-интерфейс
- лицензия: GPLv3 (community) или AGPLv3 (enterprise)

## Titan

- <http://titan.thinkaurelius.com/>
- <https://github.com/thinkaurelius/titan/>
- версия: 1.0.0
- 5013 звёзд на GitHub
- написана на Java
- поддерживается язык [Gremlin](https://tinkerpop.apache.org/) как основное
  средство работы с базой данных
- в качестве движков хранения данных использует другие СУБД
- _не обновляется с 2015 года_
- лицензия: Apache 2.0

## OrientDB

- <http://orientdb.com>
- <https://github.com/orientechnologies/orientdb>
- версия: 3.0.28
- 4087 звёзд на GitHub
- написана на Java
- в качестве основного языка запросов используется расширенный
  [SQL](http://orientdb.com/docs/last/SQL.html)
- запустить затруднительно, требуется настройка
- не удалось запустить из-за неясной ошибки аутентификации
- лицензия: Apache 2.0

## FlockDB

- <https://github.com/twitter-archive/flockdb>
- версия: 1.8.5
- 3217 звезды на GitHub
- написана на Scala
- _не поддерживается, новые версии не выходят с 2012 года_
- требуется сборка из исходников
- лицензия: Apache 2.0

## JanusGraph

- <https://janusgraph.org/>
- <https://github.com/JanusGraph/janusgraph>
- версия: 0.4.1
- 3130 звезды на GitHub
- написана на Java
- лицензия: Apache 2.0

## AgensGraph

- <https://bitnine.net/>
- <https://github.com/bitnine-oss/agensgraph>
- версия: 2.1.2
- 914 звезды на GitHub
- написана на C
- базируется на PostgreSQL
- в качестве языков запросов доступны SQL и Cypher
- требует сборки из исходных текстов
- лицензия: Apache 2.0

## Blazegraph

- <https://www.blazegraph.com/>
- <https://github.com/blazegraph/database>
- версия: 2.1.6
- 447 звёзд на GitHub
- написана на Java
- поддержка RDF/SPARQL: есть
- поддержка Apache TinkerPop: есть
- лицензия: GNU GPL 2.0

## VertexDB

- <http://www.dekorte.com/projects/opensource/vertexdb>
- <https://github.com/stevedekorte/vertexdb>
- 287 звезда на GitHub
- написана на C
- требует сборки из исходных текстов
- _нет выпусков на GitHub_
- лицензия: BSD

_Теперь движки для встраивания._

## GraphEngine

- <https://www.graphengine.io>
- <https://github.com/Microsoft/GraphEngine>
- 1840 звёзд на GitHub
- написана на C# и C++
- не является СУБД, это движок для .Net и Visual Studio
- _нет выпусков на GitHub_
- лицензия: MIT

## RedisGraph

- <https://oss.redislabs.com/redisgraph/>
- <https://github.com/RedisGraph/RedisGraph>
- версия: 2.0.4
- 926 звёзд на GitHub
- написана на C
- является модулем для Redis
- требует сборки из исходных текстов
- лицензия: Redis Source Available License

## Redis Graph (obsolete)

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

## Morpheus (Cypher for Apache Spark)

- <https://github.com/opencypher/morpheus>
  (ранее <https://github.com/opencypher/cypher-for-apache-spark>)
- версия: 0.4.2
- 261 звёзд на GitHub
- написана на Scala
- является дополнением к Apache Spark
- лицензия: Apache 2.0

## Bitsy v3

- <https://github.com/lambdazen/bitsy/wiki>
- <https://github.com/lambdazen/bitsy>
- версия: 3.2.2
- 77 звёзд на GitHub
- написана на Java
- встраиваемая СУБД
- не видно активной разработки с июля 2019
- лицензия: Apache 2.0

## Bitsy v2

- <https://bitbucket.org/lambdazen/bitsy/wiki/Home>
- <https://bitbucket.org/lambdazen/bitsy>
- написана на Java
- встраиваемая СУБД
- _не обновляется с 2016 года_
- лицензия: Apache 2.0

---

(c) Симоненко Евгений, 2017-2020
