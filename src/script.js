// Login logic
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const usernameField = document.getElementById('username');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = usernameField.value.trim();
      localStorage.setItem('username', username);
      window.location.href = 'dashboard.html';
    });
  }

  const userDisplay = document.getElementById('user-name');
  if (userDisplay) {
    const storedUser = localStorage.getItem('username');
    userDisplay.textContent = storedUser ? storedUser : 'Guest';
  }
});

// Quotes
let quotes = {
  happy: [
    "Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
    "For every minute you are angry, you lose sixty seconds of happiness. – Ralph Waldo Emerson",
    "Happiness is a warm puppy. – Charles M. Schulz"
  ],
  sad: [
    "Sadness flies away on the wings of time. – Jean de La Fontaine",
    "Tears come from the heart and not from the brain. – Leonardo da Vinci",
    "When you’re sad, you’re never really sad. You’re just another layer of human being being peeled away. – Margaret Cho"
  ],
  motivational: [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you."
  ],
  inspirational: [
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "It always seems impossible until it’s done. – Nelson Mandela",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson"
  ]
};

// Load from storage or initialize
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
} else {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Generate a quote
function generateQuote(mood) {
  const quoteArray = quotes[mood];
  const quoteText = document.getElementById('quote');

  if (!quoteArray || quoteArray.length === 0) {
    quoteText.textContent = "No quotes found for this mood.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quoteArray.length);
  quoteText.textContent = quoteArray[randomIndex];
}
