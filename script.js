const API_URL = "https://api.coursera.org/api/courses.v1";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");

form.addEventListener("dubmit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const query = input.value.trim();
  if (query.length > 0) {
    fetchCourses(query);
  }
}

async function fetchCourses(query) {
  const response = await fetch(`${API_URL}?q=search&query=${query}`);
  const data = await response.json();
  displayCourses(data.elements);
}

function displayCourses(courses) {
  results.innerHTML = "";
  for (let course of courses) {
    const card = createCourseCard(course);
    results.appendChild(card);
  }
}

function createCourseCard(course) {
  const card = document.createElement("div");
  card.className = "card";
  
  const image = document.createElement("img");
  image.className = "card-img-top";
  image.src = course.photoUrl || "https://via.placeholder.com/300x200";
  
  const body = document.createElement("div");
  body.className = "card-body";
  
  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = course.name;

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = course.description;

  const link = document.createElement("a");
  link.className = "btn btn-primary";
  link.href = `https://www.coursera.org/learn/${course.slug}`;
  link.target = "_blank";
  link.textContent = "View Course";

  const footer = document.createElement("div");