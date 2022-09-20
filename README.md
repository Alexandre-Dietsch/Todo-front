# 🗒 Todo App

Application to manage daily tasks:

- Add task
- Modify a task
- Archive a task
- Delete a task

A task has a title, a content and a deadline

https://user-images.githubusercontent.com/70936207/191201868-b5e5a0b9-2fb1-42da-bf67-64705ece4809.mp4

---

## Install and start the project locally (not recommended)

---

### FRONT

1. Clone the projet

```
mkdir todo-front
cd todo-front
git clone https://github.com/Alexandre-Dietsch/Todo-front.git
```

2. In the project, install the dependencies:

```
npm install
```

2. Start the app

```
npm start
```

### BACK

1. Clone the projet

```
mkdir todo-back
cd todo-back
git clone https://github.com/Alexandre-Dietsch/Todo-back.git
```

2. In the project, install the dependencies:

```
npm install
```

3. Set the environment variables

### `remove the ".sample" extension from the .env.sample file`

4. Start the app

```
npm run dev
```

### Mongo

Check that you have Mongo installed on your machine

```
mongosh --version
```

If you don't have MongoDB, install it. Documentation:
https://www.mongodb.com/docs/manual/installation/

You can also download MongoDB Compass:
https://www.mongodb.com/docs/compass/current/install/

Once installed, you don't have to do anything more. The database will be created
automatically when using the application.

🚨 On macOS monterey with the M1 chip, use the mongodb-community@5.0 when
installing mongoDB with homebrew

## 🐳 Use Docker (recommended)

⚠️ You need to install Docker. Documentation:
https://docs.docker.com/get-started/

---

1. Clone the projet (front)

```
mkdir todo-front
cd todo-front
git clone https://github.com/Alexandre-Dietsch/Todo-front.git
```

2. Create a docker image

```
docker build -t "todo-front" .
```

3. Clone the projet (back)

```
mkdir todo-back
cd todo-back
git clone https://github.com/Alexandre-Dietsch/Todo-back.git
```

4. Create a docker image for the back

```
docker build -t "todo-back" .
```

5. In the front root, use the docker-compose

```
docker-compose up
```
