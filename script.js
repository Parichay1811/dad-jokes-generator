const jokeDisplay = document.getElementById("jokeDisplay");
const jokeButton = document.getElementById("jokeButton");
const loading = document.getElementById("loading");
const shareButton = document.getElementById("shareButton");
const toggleMode = document.getElementById("toggleMode");
const textSize = document.getElementById("textSize");
let darkMode = false;

const fetchJoke = async () => {
  loading.classList.remove("hidden");
  jokeDisplay.classList.add("hidden");

  try {
    const response = await fetch("https://api.api-ninjas.com/v1/jokes", {
      headers: { 'X-Api-Key': 'Uuz4zTlJHdL5aEWVyfi5+w==J5OUYjV9eO9hLJbA' }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      jokeDisplay.innerText = data[0].joke;
    } else {
      jokeDisplay.innerText = "Oops! Couldn't fetch a joke. Try again!";
    }
  } catch (error) {
    jokeDisplay.innerText = "Error fetching joke. Please check your connection!";
  } finally {
    loading.classList.add("hidden");
    jokeDisplay.classList.remove("hidden");
  }
};

// Event Listeners
jokeButton.addEventListener("click", fetchJoke);

// Dark Mode Toggle
toggleMode.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  toggleMode.innerText = darkMode ? "Light Mode" : "Dark Mode";
});

// Share Joke
shareButton.addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({ text: jokeDisplay.innerText });
  } else {
    alert("Sharing not supported on this browser!");
  }
});

// Text Size Adjustment
textSize.addEventListener("change", (e) => {
  jokeDisplay.style.fontSize = e.target.value;
});

// Initial joke fetch
fetchJoke();
