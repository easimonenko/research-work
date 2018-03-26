# Групповой вещание (Multicast)

_**Внимание:**_ статья в процессе написания.

В статье даётся обзор _группового вещания_ (multicast), разновидности
широковещания.

При групповом вещании сервер посылает в сеть сообщение, что доступно групповое
подключение к нему. Клиенты, желающие присоединиться к группе вещания, посылают
ответное уведомление. При этом маршрутизаторы должны зарегистрировать такого
клиента для последующей маршрутизации. Для этого коммутаторы должны поддерживать
IGMP snooping. Кроме того, частные лица не могут осуществлять групповое вещание
(!).

IPv4 поддерживает групповое вещание на уровне подсети `224.0.0.0/24`.

...

## Ссылки

- Chuck Semeria, Tom Maufer "Introduction to IP Multicast Routing":
  <https://web.stanford.edu/class/ee384a/files/Introduction_to_IP_Multicast_Routing.pdf>
- Mohammad Banikazemi "IP Multicasting: Concepts, Algorithms, and Protocols"
  <http://www.cse.wustl.edu/~jain/cis788-97/ftp/ip_multicast/>
- RFC 5771 "IANA Guidelines for IPv4 Multicast Address Assignments":
  <https://tools.ietf.org/html/rfc5771>
- RFC 2189 "Core Based Trees (CBT version 2) Multicast Routing":
  <https://tools.ietf.org/html/rfc2189>

---

(c) 2018, Симоненко Евгений
