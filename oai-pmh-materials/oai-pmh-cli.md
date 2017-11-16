# Руководство по утилите командной строки oai-pmh

Это руководство по утилите командной строки oai-pmh, предназначенной для
получения информации с серверов с интерфейсом
[OAI-PMH](http://www.openarchives.org/OAI/2.0/openarchivesprotocol.htm).
Эта утилита выводит информацию в формате JSON, который может быть более удобен
при использовании с языком JavaScript. Для примеров используется
[arXiv.org](https://arxiv.org/help/oa/index). Результаты выполнения команд
приводятся на момент написания этой статьи.

## Установка

Для начала нужно установить [Node.js](https://nodejs.org). Рекомендуется
использовать LTS-версию. Для Linux существуют репозитории пакетов. После
установите утилиту `oai-pmh`:

``` sh
npm install -g oai-pmh
```

После установки станет доступна команда `oai-pmh`.

## Версия и справка

Для получения версии `oai-pmh` выполните:

``` sh
oai-pmh --version
```

Для получения справки:

``` sh
oai-pmh --help
```

## Идентификационная информация о сервере

Для получения идентификационной информации о сервере выполните:

``` sh
oai-pmh identify http://export.arxiv.org/oai2
```

(Эта команда, кроме формата вывода, идентична запросу
<http://export.arxiv.org/oai2?verb=Identify>.)

В результате получим:

``` json
{
  "repositoryName": "arXiv",
  "baseURL": "http://export.arxiv.org/oai2",
  "protocolVersion": "2.0",
  "adminEmail": "help@arxiv.org",
  "earliestDatestamp": "2007-05-23",
  "deletedRecord": "persistent",
  "granularity": "YYYY-MM-DD",
  "description": [
    {
      "eprints": {
        "$": {
          "xmlns": "http://www.openarchives.org/OAI/1.1/eprints",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "http://www.openarchives.org/OAI/1.1/eprints http://www.openarchives.org/OAI/1.1/eprints.xsd"
        },
        "content": {
          "text": "Author self-archived e-prints"
        },
        "metadataPolicy": {
          "text": "Metadata harvesting permitted through OAI interface",
          "URL": "http://arxiv.org/help/oa/metadataPolicy"
        },
        "dataPolicy": {
          "text": "Full-content harvesting not permitted (except by special arrangement)",
          "URL": "http://arxiv.org/help/oa/dataPolicy"
        },
        "submissionPolicy": {
          "text": "Author self-submission preferred, submissions screened for appropriateness.",
          "URL": "http://arxiv.org/help/submit"
        }
      }
    },
    {
      "branding": {
        "$": {
          "xmlns": "http://www.openarchives.org/OAI/2.0/branding/",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "http://www.openarchives.org/OAI/2.0/branding/ http://www.openarchives.org/OAI/2.0/branding.xsd"
        },
        "collectionIcon": {
          "url": "http://arxiv.org/OAI/arXivLogo.png",
          "link": "http://arxiv.org/",
          "title": "arXiv e-print archive",
          "width": "88",
          "height": "31"
        },
        "metadataRendering": {
          "_": "http://arxiv.org/OAI/arXivMetadata.xsl",
          "$": {
            "metadataNamespace": "http://www.openarchives.org/OAI/2.0/oai_dc/",
            "mimeType": "text/xsl"
          }
        }
      }
    }
  ]
}
```

## Список наборов

Для получения списка наборов выполните:

``` sh
oai-pmh list-sets http://export.arxiv.org/oai2
```

(Эта команда, кроме формата вывода, идентична запросу
<http://export.arxiv.org/oai2?verb=ListSets>.)

В результате получим:

``` json
{"setSpec":"cs","setName":"Computer Science"}
{"setSpec":"econ","setName":"Economics"}
{"setSpec":"eess","setName":"Electrical Engineering and Systems Science"}
{"setSpec":"math","setName":"Mathematics"}
{"setSpec":"physics","setName":"Physics"}
{"setSpec":"physics:astro-ph","setName":"Astrophysics"}
{"setSpec":"physics:cond-mat","setName":"Condensed Matter"}
{"setSpec":"physics:gr-qc","setName":"General Relativity and Quantum Cosmology"}
{"setSpec":"physics:hep-ex","setName":"High Energy Physics - Experiment"}
{"setSpec":"physics:hep-lat","setName":"High Energy Physics - Lattice"}
{"setSpec":"physics:hep-ph","setName":"High Energy Physics - Phenomenology"}
{"setSpec":"physics:hep-th","setName":"High Energy Physics - Theory"}
{"setSpec":"physics:math-ph","setName":"Mathematical Physics"}
{"setSpec":"physics:nlin","setName":"Nonlinear Sciences"}
{"setSpec":"physics:nucl-ex","setName":"Nuclear Experiment"}
{"setSpec":"physics:nucl-th","setName":"Nuclear Theory"}
{"setSpec":"physics:physics","setName":"Physics (Other)"}
{"setSpec":"physics:quant-ph","setName":"Quantum Physics"}
{"setSpec":"q-bio","setName":"Quantitative Biology"}
{"setSpec":"q-fin","setName":"Quantitative Finance"}
{"setSpec":"stat","setName":"Statistics"}
```

## Форматы метаданных

Для получения списка форматов метаданных выполните:

``` sh
oai-pmh list-metadata-formats http://export.arxiv.org/oai2
```

(Эта команда, кроме формата вывода, идентична запросу
<http://export.arxiv.org/oai2?verb=ListMetadataFormats>.)

В результате получим:

``` json
[
  {
    "metadataPrefix": "oai_dc",
    "schema": "http://www.openarchives.org/OAI/2.0/oai_dc.xsd",
    "metadataNamespace": "http://www.openarchives.org/OAI/2.0/oai_dc/"
  },
  {
    "metadataPrefix": "arXiv",
    "schema": "http://arxiv.org/OAI/arXiv.xsd",
    "metadataNamespace": "http://arxiv.org/OAI/arXiv/"
  },
  {
    "metadataPrefix": "arXivOld",
    "schema": "http://arxiv.org/OAI/arXivOld.xsd",
    "metadataNamespace": "http://arxiv.org/OAI/arXivOld/"
  },
  {
    "metadataPrefix": "arXivRaw",
    "schema": "http://arxiv.org/OAI/arXivRaw.xsd",
    "metadataNamespace": "http://arxiv.org/OAI/arXivRaw/"
  }
]
```

## Список записей

Для получения списка записей выполните запрос:

``` sh
oai-pmh list-records -p arXiv http://export.arxiv.org/oai2
```

(Эта команда, кроме формата вывода, идентична запросу
<http://export.arxiv.org/oai2?verb=ListRecords;metadataPrefix=arXiv>.)

В результате получим список из 1000 JSON-документов вида:

``` json
{
  "header": {
    "identifier": "oai:arXiv.org:0704.0001",
    "datestamp": "2008-11-26",
    "setSpec": "physics:hep-ph"
  },
  "metadata": {
    "arXiv": {
      "$": {
        "xmlns": "http://arxiv.org/OAI/arXiv/",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "http://arxiv.org/OAI/arXiv/ http://arxiv.org/OAI/arXiv.xsd"
      },
      "id": "0704.0001",
      "created": "2007-04-02",
      "updated": "2007-07-24",
      "authors": {
        "author": [
          {
            "keyname": "Balázs",
            "forenames": "C."
          },
          {
            "keyname": "Berger",
            "forenames": "E. L."
          },
          {
            "keyname": "Nadolsky",
            "forenames": "P. M."
          },
          {
            "keyname": "Yuan",
            "forenames": "C. -P."
          }
        ]
      },
      "title": "Calculation of prompt diphoton production cross sections at Tevatron and LHC energies",
      "categories": "hep-ph",
      "comments": "37 pages, 15 figures; published version",
      "report-no": "ANL-HEP-PR-07-12",
      "journal-ref": "Phys.Rev.D76:013009,2007",
      "doi": "10.1103/PhysRevD.76.013009",
      "abstract": "A fully differential calculation in perturbative quantum chromodynamics is\npresented for the production of massive photon pairs at hadron colliders. All\nnext-to-leading order perturbative contributions from quark-antiquark,\ngluon-(anti)quark, and gluon-gluon subprocesses are included, as well as\nall-orders resummation of initial-state gluon radiation valid at\nnext-to-next-to-leading logarithmic accuracy. The region of phase space is\nspecified in which the calculation is most reliable. Good agreement is\ndemonstrated with data from the Fermilab Tevatron, and predictions are made for\nmore detailed tests with CDF and DO data. Predictions are shown for\ndistributions of diphoton pairs produced at the energy of the Large Hadron\nCollider (LHC). Distributions of the diphoton pairs from the decay of a Higgs\nboson are contrasted with those produced from QCD processes at the LHC, showing\nthat enhanced sensitivity to the signal can be obtained with judicious\nselection of events."
    }
  }
}
```

Этот JSON-документ содержит метаданные о статье, размещённой на arXiv.org.
Структура этого документа ясная и не требует пояснений.

В этом виде запросов с помощью опции `--set` (`-s`) уточнить набор, из которого
хотим получить метаданные, например:

``` bash
oai-pmh list-records -p arXiv -s cs http://export.arxiv.org/oai2
```

(Эта команда, кроме формата вывода, идентична запросу
<http://export.arxiv.org/oai2?verb=ListRecords&set=cs&metadataPrefix=arXiv>.)

Получим:

``` json
{
  "header": {
    "identifier": "oai:arXiv.org:0704.0002",
    "datestamp": "2008-12-13",
    "setSpec": "cs"
  },
  "metadata": {
    "arXiv": {
      "$": {
        "xmlns": "http://arxiv.org/OAI/arXiv/",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "http://arxiv.org/OAI/arXiv/ http://arxiv.org/OAI/arXiv.xsd"
      },
      "id": "0704.0002",
      "created": "2007-03-30",
      "updated": "2008-12-13",
      "authors": {
        "author": [
          {
            "keyname": "Streinu",
            "forenames": "Ileana"
          },
          {
            "keyname": "Theran",
            "forenames": "Louis"
          }
        ]
      },
      "title": "Sparsity-certifying Graph Decompositions",
      "categories": "math.CO cs.CG",
      "comments": "To appear in Graphs and Combinatorics",
      "msc-class": "05C85; 05C70; 68R10; 05B35",
      "license": "http://arxiv.org/licenses/nonexclusive-distrib/1.0/",
      "abstract": "We describe a new algorithm, the $(k,\\ell)$-pebble game with colors, and use\nit obtain a characterization of the family of $(k,\\ell)$-sparse graphs and\nalgorithmic solutions to a family of problems concerning tree decompositions of\ngraphs. Special instances of sparse graphs appear in rigidity theory and have\nreceived increased attention in recent years. In particular, our colored\npebbles generalize and strengthen the previous results of Lee and Streinu and\ngive a new proof of the Tutte-Nash-Williams characterization of arboricity. We\nalso present a new decomposition that certifies sparsity based on the\n$(k,\\ell)$-pebble game with colors. Our work also exposes connections between\npebble game algorithms and previous sparse graph algorithms by Gabow, Gabow and\nWestermann and Hendrickson."
    }
  }
}
```

Для получения всех записей, начиная с определённой даты, нужно указать
опцию `--from` (`-f`):

``` bash
oai-pmh list-records -p arXiv -s cs -f 2017-11-16 http://export.arxiv.org/oai2
```

Для получения всех записей до определённой даты, нужно указать
опцию `--until` (`-u`).

## Получение записи

Для получение метаданных конкретной записи выполните команду вида:

``` sh
oai-pmh get-record -p arXiv -i oai:arXiv.org:0704.0002 http://export.arxiv.org/oai2
```

Получим:

``` json
{
  "header": {
    "identifier": "oai:arXiv.org:0704.0002",
    "datestamp": "2008-12-13",
    "setSpec": [
      "cs",
      "math"
    ]
  },
  "metadata": {
    "arXiv": {
      "$": {
        "xmlns": "http://arxiv.org/OAI/arXiv/",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "http://arxiv.org/OAI/arXiv/ http://arxiv.org/OAI/arXiv.xsd"
      },
      "id": "0704.0002",
      "created": "2007-03-30",
      "updated": "2008-12-13",
      "authors": {
        "author": [
          {
            "keyname": "Streinu",
            "forenames": "Ileana"
          },
          {
            "keyname": "Theran",
            "forenames": "Louis"
          }
        ]
      },
      "title": "Sparsity-certifying Graph Decompositions",
      "categories": "math.COcs.CG",
      "comments": "To appear in Graphs and Combinatorics",
      "msc-class": "05C85; 05C70; 68R10; 05B35",
      "license": "http://arxiv.org/licenses/nonexclusive-distrib/1.0/",
      "abstract": "We describe a new algorithm, the $(k,\\ell)$-pebble game with colors, and use\nit obtain a characterization of the family of $(k,\\ell)$-sparse graphs and\nalgorithmic solutions to a family of problems concerning tree decompositions of\ngraphs. Special instances of sparse graphs appear in rigidity theory and have\nreceived increased attention in recent years. In particular, our colored\npebbles generalize and strengthen the previous results of Lee and Streinu and\ngive a new proof of the Tutte-Nash-Williams characterization of arboricity. We\nalso present a new decomposition that certifies sparsity based on the\n$(k,\\ell)$-pebble game with colors. Our work also exposes connections between\npebble game algorithms and previous sparse graph algorithms by Gabow, Gabow and\nWestermann and Hendrickson."
    }
  }
}
```

Результат идентичен HTTP-запросу ниже за исключением формата:

``` http
http://export.arxiv.org/oai2?verb=GetRecord&metadataPrefix=arXiv&identifier=oai:arXiv.org:0704.0002
```

Получаем:

``` xml
<OAI-PMH xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/ http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>2017-11-09T19:00:22Z</responseDate>
  <request verb="GetRecord" identifier="oai:arXiv.org:0704.0002" metadataPrefix="arXiv">http://export.arxiv.org/oai2</request>
  <GetRecord>
    <record>
      <header>
        <identifier>oai:arXiv.org:0704.0002</identifier>
        <datestamp>2008-12-13</datestamp>
        <setSpec>cs</setSpec>
        <setSpec>math</setSpec>
      </header>
      <metadata>
        <arXiv xsi:schemaLocation="http://arxiv.org/OAI/arXiv/ http://arxiv.org/OAI/arXiv.xsd">
          <id>0704.0002</id>
          <created>2007-03-30</created>
          <updated>2008-12-13</updated>
          <authors>
            <author>
              <keyname>Streinu</keyname>
              <forenames>Ileana</forenames>
            </author>
            <author>
              <keyname>Theran</keyname>
              <forenames>Louis</forenames>
            </author>
          </authors>
          <title>Sparsity-certifying Graph Decompositions</title>
          <categories>math.CO cs.CG</categories>
          <comments>To appear in Graphs and Combinatorics</comments>
          <msc-class>05C85; 05C70; 68R10; 05B35</msc-class>
          <license>http://arxiv.org/licenses/nonexclusive-distrib/1.0/</license>
          <abstract>  We describe a new algorithm, the $(k,\ell)$-pebble game with colors, and use
it obtain a characterization of the family of $(k,\ell)$-sparse graphs and
algorithmic solutions to a family of problems concerning tree decompositions of
graphs. Special instances of sparse graphs appear in rigidity theory and have
received increased attention in recent years. In particular, our colored
pebbles generalize and strengthen the previous results of Lee and Streinu and
give a new proof of the Tutte-Nash-Williams characterization of arboricity. We
also present a new decomposition that certifies sparsity based on the
$(k,\ell)$-pebble game with colors. Our work also exposes connections between
pebble game algorithms and previous sparse graph algorithms by Gabow, Gabow and
Westermann and Hendrickson.
</abstract>
        </arXiv>
      </metadata>
    </record>
  </GetRecord>
</OAI-PMH>
```

## Список идентификаторов

Для получения списка идентификаторов выполните запрос:

``` sh
oai-pmh list-identifiers -p arXiv -f 2017-11-16 http://export.arxiv.org/oai2
```

Получим список JSON-документов:

``` json
{"identifier":"oai:arXiv.org:0901.2457","datestamp":"2017-11-16","setSpec":"math"}
{"identifier":"oai:arXiv.org:1005.1462","datestamp":"2017-11-16","setSpec":"math"}
{"identifier":"oai:arXiv.org:1006.2955","datestamp":"2017-11-16","setSpec":"cs"}
```

Идентично соответствующему HTTP-запросу за исключением формата ответа:

``` url
http://export.arxiv.org/oai2?verb=ListIdentifiers&metadataPrefix=arXiv&set=cs&from=2017-11-16
```

Результат:

``` xml
<OAI-PMH xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/ http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>2017-11-16T18:46:16Z</responseDate>
  <request verb="ListIdentifiers" from="2017-11-16" metadataPrefix="arXiv" set="cs">http://export.arxiv.org/oai2</request>
  <ListIdentifiers>
    <header>
      <identifier>oai:arXiv.org:1006.2955</identifier>
      <datestamp>2017-11-16</datestamp>
      <setSpec>cs</setSpec>
    </header>
    <header>
      <identifier>oai:arXiv.org:1511.05201</identifier>
      <datestamp>2017-11-16</datestamp>
      <setSpec>cs</setSpec>
    </header>
    <header>
      <identifier>oai:arXiv.org:1511.06660</identifier>
      <datestamp>2017-11-16</datestamp>
      <setSpec>cs</setSpec>
    </header>
  </ListIdentifiers>
</OAI-PMH>
```

## Заключение

Утилита oai-pmh в сочетании с другими средствами работы с JSON-документами
позволяет выполнять разнообразные запросы и представлять их в компактном и ясном
виде. ~~Однако ввиду отсутствия подробного руководства, не удалось рассмотреть
все возможности данной утилиты.~~ (Руководство было обновлено 16 ноября 2017 в
ответ на
[запрос](https://github.com/paperhive/oai-pmh/issues/4#issuecomment-343262293)
автора статьи.)

---

(c) 2017, Симоненко Евгений <easimonenko@mail.ru>
