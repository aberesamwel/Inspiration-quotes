
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  const userDisplay = document.getElementById('user-name');
  const dashboardLink = document.getElementById('dashboard-link');
  const loginLink = document.getElementById('login-link');
  const togglePassword = document.getElementById('toggle-password');

  const storedUser = localStorage.getItem('username');

  // Update nav links based on login state
  if (storedUser) {
    if (dashboardLink) dashboardLink.style.display = 'inline';
    if (loginLink) {
      loginLink.innerHTML = '<a href="#">Logout</a>';
      loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('username');
        window.location.href = 'index.html';
      });
    }
  } else {
    if (dashboardLink) dashboardLink.style.display = 'none';
    if (window.location.pathname.includes('dashboard.html')) {
      alert('You must be logged in to access the dashboard.');
      window.location.href = 'login.html';
    }
  }

  // Show username on dashboard
  if (userDisplay) {
    userDisplay.textContent = storedUser ? storedUser : 'Guest';
  }

  // Toggle password visibility
  if (togglePassword && passwordField) {
    togglePassword.addEventListener('click', () => {
      const isVisible = passwordField.type === 'text';
      passwordField.type = isVisible ? 'password' : 'text';
      togglePassword.textContent = isVisible ? '' : '';
    });
  }

  // Handle login
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = usernameField.value.trim();
      const password = passwordField.value;

      if (!username || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        alert("Invalid login. Password must be at least 8 characters long and include both letters and numbers.");
        return;
      }

      localStorage.setItem('username', username);
      window.location.href = 'dashboard.html';

    });
  }

  // Load and display a quote on page load
  generateQuote();
});

// Quotes data
let quotes = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    image: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=600",
    music: "https://www.bensound.com/bensound-music/bensound-epic.mp3"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600",
    music: "https://www.bensound.com/bensound-music/bensound-sunny.mp3"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    image: "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&w=600",
    music: "https://www.bensound.com/bensound-music/bensound-tomorrow.mp3"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=600",
    music: "https://www.bensound.com/bensound-music/bensound-dreams.mp3"
  },
  {
    text: "Stop looking at the time, as you wish to buy anything without looking the price.",
    author: "Samuel Maina",
    image: "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=600",
    music: "https://www.bensound.com/bensound-music/bensound-goinghigher.mp3"
  },
  {
    text: "The best view comes after the hardest climb.",
    author: "Samuel Maina",
    image: "https://images.pexels.com/photos/28302212/pexels-photo-28302212/free-photo-of-landscape-taken-in-brighouse.jpeg?auto=compress&cs=tinysrgb&w=600",
    music: "https://www.bensound.com/bensound-music/bensound-energy.mp3"
  }
];

// Merge stored quotes from localStorage
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
  const parsedQuotes = JSON.parse(storedQuotes);
  quotes = [...quotes, ...parsedQuotes];
} else {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Define generateQuote globally
function generateQuote() {
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const quoteCardImg = document.querySelector('#quoteCard img');
  const music = document.getElementById("backgroundMusic");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  if (quoteText) quoteText.textContent = quote.text;
  if (quoteAuthor) quoteAuthor.textContent = ` ${quote.author}`;
  if (quoteCardImg) quoteCardImg.src = quote.image;

  if (music) {
    music.pause();
    music.src = quote.music;
    music.load();
    music.play().catch(err => console.log("Playback failed:", err));
  }
}

// Expose generateQuote to global scope
window.generateQuote = generateQuote;

