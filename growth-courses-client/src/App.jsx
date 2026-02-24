import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/courses"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Не удалось загрузить курсы");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Курсы личностного роста</h1>

      {courses.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <h3>{course.title}</h3>
            <p><b>Категория:</b> {course.category}</p>
            <p>{course.description}</p>
            <p><b>Цена:</b> {course.price} ₽</p>
            <p><b>Мест осталось:</b> {course.seats}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;