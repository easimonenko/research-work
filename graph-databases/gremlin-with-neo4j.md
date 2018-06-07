# Gremlin с Neo4j

_В статье рассматривается использование Gremlin 3.3.3 с Neo4j 3.4.0._

## Установка

Для установки нужно сходить на главную проекта [Apache TinkerPop](http://tinkerpop.apache.org/), скачать и 
разархивировать в подходящее место два архива: _Gremlin Console_ и _Gremlin Server_.

## Добавление поддержки Neo4j

Gremlin Console:

``` sh
cd apache-tinkerpop-gremlin-console-3.3.3/bin
./gremlin.sh
```

``` groovy
:install org.apache.tinkerpop neo4j-gremlin 3.3.3
:plugin list
:quit
```

_Примечание._ Версию указываем совпадающую с установленным Gremlin. Установка займёт некоторое время, так 
как объём загружаемых пакетов Java порядка 200Мб.

Вновь запускаем Gremlin Console и активируем плагин:

``` groovy
:plugin use tinkerpop.neo4j
:plugin list
```

Gremlin Server:

``` sh
cd apache-tinkerpop-gremlin-server-3.3.3/bin
./gremlin-server.sh install org.apache.tinkerpop neo4j-gremlin 3.3.3
```

_Примечание._ Установка плагина для сервера произойдёт быстрей, так как всё необходимое уже в кэше Groovy.

## Запуск и начало работы

Gremlin Server:

``` sh
cd apache-tinkerpop-gremlin-server-3.3.3/bin
./gremlin-server.sh start ../conf/gremlin-server-neo4j.yaml
```

Gremlin Console:

``` sh
cd apache-tinkerpop-gremlin-console-3.3.3/bin
./gremlin.sh
```

``` groovy
:remote connect tinkerpop.server conf/remote.yaml
:> g.addV('Evgeny')
:> g.V(0).property('name', 'Evgeny')
:> g.V(0).properties()
:> g.addV('Dmitry').property('name', 'Dmitry')
:> g.V()
:> g.addE('KNOWS').from(g.V(0)).to(g.V(2))
:> g.addE('KNOWS').from(g.V(2)).to(g.V(0))
:> g.E()
```

## Ссылки

- [Apache TinkerPop](http://tinkerpop.apache.org/)
- [TinkerPop3 Documentation](http://tinkerpop.apache.org/docs/3.3.3/reference/)
- [The Apache Groovy programming language](http://groovy.apache.org/)

***

(c) 2018, Симоненко Евгений
