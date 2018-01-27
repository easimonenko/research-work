# Установка и запуск Neo4j

В статье рассматривается как установить графовую СУБД Neo4j в среде
Ubuntu Linux. Часть информации также будет актуальна и для других вариантов
Linux. Рассматриваемая версия Neo4j 3.3.2.

## Установка

Официальные инструкции по установке Neo4j в Debian и в Ubuntu
[здесь](http://debian.neo4j.org/) и [здесь](http://neo4j.com/docs/operations-manual/current/installation/linux/debian/).
Инструкции по установке в другие операционные системы можно найти [здесь](https://neo4j.com/download/other-releases/).

Как обычно в Debian и в Ubuntu установка сводится к добавлению ключа,
добавлению источника пакетов, обновлению локального кэша и собственно установке
пакета:

``` sh
wget -O - https://debian.neo4j.org/neotechnology.gpg.key | sudo apt-key add -
echo 'deb https://debian.neo4j.org/repo stable/' | sudo tee /etc/apt/sources.list.d/neo4j.list
sudo apt update
```

Neo4j поставлется в двух вариантах: Community и Enterprise, соответственно:

``` sh
sudo apt install neo4j
```

или

``` sh
sudo apt install neo4j-enterprise
```

Помимо `neo4j` будут установлены пакеты `cypher-shell` и `daemon`. Установка
займёт на диске порядка 100Мб.

## Запуск

Запуск в Ubuntu:

``` sh
sudo service neo4j start
```

Проверка:

``` sh
http http://localhost:7474
```

``` http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Length: 136
Content-Type: application/json; charset=UTF-8
Date: Fri, 19 Jan 2018 20:40:53 GMT
Server: Jetty(9.2.22.v20170606)

{
    "bolt": "bolt://localhost:7687", 
    "data": "http://localhost:7474/db/data/", 
    "management": "http://localhost:7474/db/manage/"
}
```

Если попытаться перейти по ссылке `management`, ввести имя пользователя `neo4j`
и пароль `neo4j`, то получим отказ с формулировкой
`"User is required to change their password."`.

А вот оболочка Cypher нас пустит:

``` sh
cypher-shell
```

``` plain
username: neo4j
password: *****
Connected to Neo4j 3.3.1 at bolt://localhost:7687 as user neo4j.
Type :help for a list of available commands or :exit to exit the shell.
Note that Cypher queries must end with a semicolon.
neo4j>
```

Задание пароля пользователя:

``` sh
sudo neo4j-admin set-initial-password h6u4%kr
```

Если получили сообщение об ошибке _"command failed: initial password was not set
because live Neo4j-users were detected."_, то нужно остановить сервис Neo4j:

``` sh
sudo service neo4j stop
```

удалить файл `/var/lib/neo4j/data/dbms/auth`, повторить установку пароля

``` plain
Changed password for user 'neo4j'.
```

и перезапустить сервер.



``` sh
sudo service neo4j restart
```

Для работы с Neo4j в браузере нужно перейти по ссылке
<http://localhost:7474/browser/>. После чего откроется великолепный
веб-интерфейс:

![Neo4j browser: home screen](./images/neo4j-browser-home.png)

Вместо `cypher-shell` можно установить альтернативный клиент
[cycli](https://github.com/nicolewhite/cycli):

``` sh
pip install --user cycli
```

``` sh
cycli -u neo4j
```

``` plain
Password: 
 ______     __  __     ______     __         __    
/\  ___\   /\ \_\ \   /\  ___\   /\ \       /\ \   
\ \ \____  \ \____ \  \ \ \____  \ \ \____  \ \ \  
 \ \_____\  \/\_____\  \ \_____\  \ \_____\  \ \_\ 
  \/_____/   \/_____/   \/_____/   \/_____/   \/_/ 
Cycli version: 0.7.6
Neo4j version: 3.3.1
Bug reports: https://github.com/nicolewhite/cycli/issues

> quit
Goodbye!
```

## Что почитать

Кроме собственно документации на сайте Neo4j есть пара книг на русском языке:

- Робинсон Ян, Вебер Джим, Эифрем Эмиль. Графовые базы данных. Новые
  возможности для работы со связанными данными. -- 2016. -- 256 с.
- Редмонд Эрик, Уилсон Джим Р. Семь баз данных за семь недель. Введение в
  современные базы данных и идеологию NoSQL. -- 2015. -- 384 с.

Интересные статьи на русском языке:

- [Изучаем граф-ориентированную СУБД Neo4j на примере лексической базы Wordnet](https://habrahabr.ru/post/273241/)
- [Начинаем работать с графовой базой данных Neo4j (фильтр товаров)](https://habrahabr.ru/post/219441/)

## Ссылки

- [Сайт Neo4j](https://neo4j.com/)
- [Neo4j на GitHub](https://github.com/neo4j/neo4j)
- [Загрузка различных выпусков Neo4j](https://neo4j.com/download/other-releases/)
- [Сервер пакетов для Debian/Ubuntu](http://debian.neo4j.org/)
- [Инструкции по установке в Debian/Ubuntu](http://neo4j.com/docs/operations-manual/current/installation/linux/debian/)
- [cycli -- альтернативный клиент Cypher](https://github.com/nicolewhite/cycli)

---

(c) Симоненко Евгений, 2018
