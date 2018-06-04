# Краткий обзор свободно-распространяемых графовых СУБД

## Neo4j

- <https://neo4j.com/>
- <https://github.com/neo4j/neo4j>
- версия: 3.4.0
- 5148 звезд на GitHub
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

## ArangoDB

- <https://www.arangodb.com/>
- <https://github.com/arangodb/arangodb>
- версия: 3.3.10
- 5726 звёзд на GitHub
- написана на C++
- язык запросов [AQL](https://docs.arangodb.com/latest/AQL/index.html)
- хорошая документация
- есть пакеты для многих операционных систем
- веб-интерфейс с графическим редактором
- лицензия: Apache 2.0

## Titan

- <http://titan.thinkaurelius.com/>
- <https://github.com/thinkaurelius/titan/>
- версия: 1.0.0
- 4702 звёзд на GitHub
- написана на Java
- поддерживается язык [Gremlin](https://tinkerpop.apache.org/) как основное
  средство работы с базой данных
- в качестве движков хранения данных использует другие СУБД
- лицензия: Apache 2.0

## OrientDB

- <http://orientdb.com>
- <https://github.com/orientechnologies/orientdb>
- версия: 3.0.1
- 3503 звёзд на GitHub
- написана на Java
- в качестве основного языка запросов используется расширенный
  [SQL](http://orientdb.com/docs/last/SQL.html)
- запустить затруднительно, требуется настройка
- не удалось запустить из-за неясной ошибки аутентификации
- лицензия: Apache 2.0

## Cayley

- <https://www.cayley.io/>
- <https://github.com/cayleygraph/cayley>
- версия: 0.7.4
- 11390 звёзд на GitHub
- написана на Go
- в качестве языков запросов доступны JavaScript и
  [MQL](https://ru.wikipedia.org/wiki/MQL)
- в качестве движков хранения данных использует другие СУБД
- сайт с документацией пуст, есть документация среди исходников на GitHub
- предлагает несколько вариантов для хранения данных, используя другие СУБД
- при запуске рухнула, сославшись на то, что не были найдены какие-то assets в
  Go workspace
- лицензия: Apache 2.0

## FlockDB

- <https://github.com/twitter-archive/flockdb>
- версия: 1.8.5
- 3145 звезды на GitHub
- написана на Scala
- не поддерживается
- требуется сборка из исходников
- лицензия: Apache 2.0

## GraphEngine

- <https://www.graphengine.io>
- <https://github.com/Microsoft/GraphEngine>
- 1510 звёзд на GitHub
- написана на C# и C++
- не является СУБД, это движок для .Net и Visual Studio
- лицензия: MIT

## Blazegraph

- <https://www.blazegraph.com/>
- <https://github.com/blazegraph/database>
- версия: 2.1.5
- 267 звёзд на GitHub
- написана на Java
- лицензия: GNU GPL 2.0
- поддержка RDF/SPARQL: есть
- поддержка Apache TinkerPop: есть

## VertexDB

- <http://www.dekorte.com/projects/opensource/vertexdb>
- <https://github.com/stevedekorte/vertexdb>
- 280 звезда на GitHub
- написана на C
- требует сборки из исходных текстов
- лицензия: BSD

## AgensGraph

- <http://bitnine.net/>
- <https://github.com/bitnine-oss/agensgraph>
- версия: 1.3.1
- 558 звезды на GitHub
- написана на C
- базируется на PostgreSQL
- в качестве языков запросов доступны SQL и Cypher
- требует сборки из исходных текстов
- лицензия: Apache 2.0

## Redis Graph

- <http://redisgraph.io/>
- <https://github.com/swilly22/redis-graph>
- 384 звёзд на GitHub
- написана на C
- требует сборки из исходных текстов
- лицензия: AGPL 3.0

## Cypher for Apache Spark

- <https://github.com/opencypher/cypher-for-apache-spark>
- версия: 0.1.1
- 88 звёзд на GitHub
- написана на Scala
- требует сборки из исходных текстов
- лицензия: Apache 2.0

## Bitsy v3

- <https://github.com/lambdazen/bitsy/wiki>
- <https://github.com/lambdazen/bitsy>
- версия: 3.0.1
- 19 звёзд на GitHub
- написана на Java
- встраиваемая СУБД
- лицензия: Apache 2.0

## Bitsy v2

- <https://bitbucket.org/lambdazen/bitsy/wiki/Home>
- <https://bitbucket.org/lambdazen/bitsy>
- написана на Java
- встраиваемая СУБД
- лицензия: Apache 2.0

---

(c) Симоненко Евгений, 2017-2018
