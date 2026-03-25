# React Components & Props — Guided Classroom Activity

This activity will walk you through building a small React app that displays a list of students using reusable components and props. You (the student) will create a `StudentCard` component and render multiple cards using data passed via props.

---

## 🎯 Activity Goals

By the end of this guided activity, you will be able to:

- Create functional components in React.
- Pass data using **props**.
- Render lists using `.map()`.
- Display images from dynamic URLs.

---

## 🧱 Project Setup

Make sure you have a Vite + React app or a Create React App project ready.

Run (in terminal):

* **npm** **create** **vite@latest** **my-app -- --template react**
* **cd my-app**
* **npm** **install**
* **npm** **run dev**



Project structure:

```
src/
  App.jsx
  StudentCard.jsx
  students.js
```

---

## 🧑‍🎓 Step 1 — Create a Student List with Photos

Create a file named `students.js` and add the following:

```js
export const students = [
  {
    id: 1,
    name: "Alice Johnson",
    program: "IT Programming",
    year: 1,
    photo: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    id: 2,
    name: "Ben Carter",
    program: "Cybersecurity",
    year: 2,
    photo: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 3,
    name: "Chloe Patel",
    program: "Web Development",
    year: 1,
    photo: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];
```

✔ **Teaching moment:** Explain how data structures are used to drive UI.

---

## 🧩 Step 2 — Create the `StudentCard` Component

Create a new file named `StudentCard.jsx`:

```jsx
function StudentCard({ name, program, year, photo }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      width: "260px",
      background: "#fafafa"
    }}>
      <img
        src={photo}
        alt={name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2>{name}</h2>
      <p><strong>Program:</strong> {program}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>
  );
}

export default StudentCard;
```

✔ **Teaching moment:**

- Components are functions that return JSX.
- Props allow components to receive data.
- Images work like any other JSX element.

---

## 🧱 Step 3 — Render the List in `App.jsx`

Open **App.jsx** and update it to:

```jsx
import StudentCard from "./StudentCard";
import { students } from "./students";

function App() {
  return (
    <div>
      <h1>Student List</h1>

      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          program={student.program}
          year={student.year}
          photo={student.photo}
        />
      ))}
    </div>
  );
}

export default App;
```

✔ **Teaching moment:** `.map()` generates multiple components.

---

## 🧪 Step 4 — Your Turn (Mini Challenges)

Choose any (or all) of the following:

### 🔹 Challenge 1 — Add a "bio" field and display it.

### 🔹 Challenge 2 — Add a button inside each card:

- When clicked, log the student's name.

### 🔹 Challenge 3 — Apply CSS styles instead of inline styles.

---

## 🏁 Wrap-Up

You have now:

- Created reusable React components.
- Passed props.
- Rendered dynamic content.
- Displayed images from URLs.

This is the foundation for building complex, component-driven UIs.

---
