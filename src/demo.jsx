// GET request
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
// POST request
fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
 With async/await
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

GET Request
import axios from "axios";
axios.get("https://api.example.com/data")
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));
 POST Request
axios.post("https://api.example.com/data", { name: "John" })