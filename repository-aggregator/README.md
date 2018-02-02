# repository-aggregator

*Repository Aggregator* является частью мега-проекта *InsightProject* кафедры
Информатики и прикладной математики Университета ИТМО. Данная часть отвечает
за агрегацию информации о репозиториях разных форматов, как то Git, Mercurial,
SVN.

Архитектурно проект представляет их себя набор сервисов:

- сервис запросов к Git (git-broker);
- сервис запросов к Mercurial (hg-broker);
- сервис запросов к Subversion (svn-broker);
- сервис агрегации информации от вышеперечисленных сервисов (repository-aggregator).

Для кеширования информации о репозиториях планируется использовать СУБД, тип
которой ещё не выбран.

Все сервисы предоставляют RESTful API, написанный с использованием Swagger.

На данный момент проект открыт лишь частично.

Артефакты проекта:

- [svn-broker](https://github.com/severe-island/ra-svn-broker)
- [demo-application](https://github.com/severe-island/ra-demo-application)
- [проект в ProjectLibre на период с октября по декабрь 2017](./repository-aggregator.pod)
- [проект в Umbrello (диаграммы UML)](./repository-aggregator.xmi)
- [диаграммы UML в формате PNG](./uml/README.md)

Участники проекта:

- Перл Иван Андреевич: инициатор проекта
- Симоненко Евгений @easimonenko: менеджер проекта, разработчик
  `repository-aggregator` и
  [demo-application](https://github.com/severe-island/ra-demo-application)
- Фролов Артём: разработчик `git-broker`
- Акпаралиев Нурбек: разработчик `hg-broker`
- Медведев Дмитрий @Mislitel: разработчик [svn-broker](https://github.com/severe-island/ra-svn-broker)
- Иппо Вера: тестировщик проекта
- Маслова Виктория: отвечает за качество и внедрение проекта

---

(c) Симоненко Евгений, 2017-2018
