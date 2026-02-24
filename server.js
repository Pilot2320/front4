const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ====== Курсы ======

let courses = [
  {
    id: nanoid(6),
    title: "Уверенность в себе",
    category: "Саморазвитие",
    description: "Практический курс по развитию уверенности и самооценки.",
    price: 4900,
    seats: 25,
    rating: 4.8
  },
  {
    id: nanoid(6),
    title: "Эмоциональный интеллект",
    category: "Психология",
    description: "Развитие навыков понимания и управления эмоциями.",
    price: 5200,
    seats: 18,
    rating: 4.7
  },
  {
    id: nanoid(6),
    title: "Публичные выступления",
    category: "Коммуникация",
    description: "Как выступать уверенно перед аудиторией.",
    price: 6100,
    seats: 15,
    rating: 4.9
  },
  {
    id: nanoid(6),
    title: "Тайм-менеджмент",
    category: "Продуктивность",
    description: "Эффективное планирование и управление временем.",
    price: 4500,
    seats: 30,
    rating: 4.6
  },
  {
    id: nanoid(6),
    title: "Лидерство",
    category: "Бизнес",
    description: "Навыки управления и влияния.",
    price: 7500,
    seats: 12,
    rating: 4.9
  },
  {
    id: nanoid(6),
    title: "Финансовое мышление",
    category: "Финансы",
    description: "Формирование здоровых финансовых привычек.",
    price: 6800,
    seats: 20,
    rating: 4.7
  },
  {
    id: nanoid(6),
    title: "Стресс-менеджмент",
    category: "Психология",
    description: "Методы управления стрессом и выгоранием.",
    price: 5300,
    seats: 22,
    rating: 4.5
  },
  {
    id: nanoid(6),
    title: "Навыки переговоров",
    category: "Коммуникация",
    description: "Техники успешных переговоров.",
    price: 7200,
    seats: 14,
    rating: 4.8
  },
  {
    id: nanoid(6),
    title: "Целеполагание",
    category: "Саморазвитие",
    description: "Постановка и достижение целей.",
    price: 4700,
    seats: 28,
    rating: 4.6
  },
  {
    id: nanoid(6),
    title: "Креативное мышление",
    category: "Развитие мышления",
    description: "Развитие творческого подхода к задачам.",
    price: 5900,
    seats: 19,
    rating: 4.7
  }
];

// ===== Вспомогательная функция =====

function findCourseOr404(id, res) {
  const course = courses.find(c => c.id === id);
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return null;
  }
  return course;
}

// ===== CRUD =====

// CREATE
app.post("/api/courses", (req, res) => {
  const { title, category, description, price, seats } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  const newCourse = {
    id: nanoid(6),
    title: title.trim(),
    category: category.trim(),
    description: description.trim(),
    price: Number(price),
    seats: Number(seats),
    rating: 0
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// READ ALL
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// READ ONE
app.get("/api/courses/:id", (req, res) => {
  const course = findCourseOr404(req.params.id, res);
  if (!course) return;
  res.json(course);
});

// UPDATE
app.patch("/api/courses/:id", (req, res) => {
  const course = findCourseOr404(req.params.id, res);
  if (!course) return;

  const { title, category, description, price, seats } = req.body;

  if (title !== undefined) course.title = title.trim();
  if (category !== undefined) course.category = category.trim();
  if (description !== undefined) course.description = description.trim();
  if (price !== undefined) course.price = Number(price);
  if (seats !== undefined) course.seats = Number(seats);

  res.json(course);
});

// DELETE
app.delete("/api/courses/:id", (req, res) => {
  const exists = courses.some(c => c.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: "Course not found" });
  }

  courses = courses.filter(c => c.id !== req.params.id);
  res.status(204).send();
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Запуск
app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});