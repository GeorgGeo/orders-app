# Orders App

Тестовое задание, выполненное на Vue 3 + Vite.

## Возможности

- Просмотр списка заказов
- Просмотр списка продуктов
- Создание заказа
- Удаление заказа
- Работа с MockAPI
- Обновление данных в реальном времени через Socket.IO
- Маршрутизация с Vue Router
- Docker-поддержка приложения

## Технологии

- Vue 3
- Vite
- Vue Router
- Vuex
- Axios
- Bootstrap 5
- Socket.IO Client
- MockAPI
- Docker

## Запуск проекта

Установка зависимостей

```bash
npm install
```

Запуск в режиме разработки

```bash
npm run dev
```

Сборка проекта

```bash
npm run build
```

## Запуск через Docker

Сборка Docker-образа

```bash
docker build -t orders-app .
```

Запуск контейнера

```bash
docker run -p 5173:5173 orders-app
```

После запуска приложение будет доступно по адресу

```
http://localhost:5173
```

## Ссылки

GitHub Repository

https://github.com/GeorgGeo/orders-app

GitHub Pages

https://georggeo.github.io/orders-app/

