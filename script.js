// ===== Sample Restaurant Data =====
// Replace this with your own real restaurants, images, ratings etc.
const restaurants = [
  { name: "Spice Route", cuisine: "north indian", tags: "North Indian · Mughlai", rating: 4.3, price: "₹500 for two", time: "25-30 min", emoji: "🍛", color1: "#b34cf0", color2: "#6a1fd0" },
  { name: "Dosa Junction", cuisine: "south indian", tags: "South Indian · Filter Coffee", rating: 4.5, price: "₹250 for two", time: "20-25 min", emoji: "🥞", color1: "#ffb238", color2: "#e8912a" },
  { name: "Pizza Bay", cuisine: "pizza", tags: "Pizza · Italian", rating: 4.1, price: "₹450 for two", time: "30-35 min", emoji: "🍕", color1: "#6a1fd0", color2: "#2c0d55" },
  { name: "Brew & Bean Cafe", cuisine: "cafe", tags: "Cafe · Continental", rating: 4.6, price: "₹350 for two", time: "15-20 min", emoji: "☕", color1: "#2c0d55", color2: "#b34cf0" },
  { name: "Sweet Tooth", cuisine: "desserts", tags: "Desserts · Bakery", rating: 4.4, price: "₹200 for two", time: "20-25 min", emoji: "🍰", color1: "#ffb238", color2: "#b34cf0" },
  { name: "Dragon Wok", cuisine: "chinese", tags: "Chinese · Asian", rating: 3.9, price: "₹400 for two", time: "30-40 min", emoji: "🥡", color1: "#b34cf0", color2: "#2c0d55" },
  { name: "Tandoor Nights", cuisine: "north indian", tags: "North Indian · BBQ", rating: 4.2, price: "₹600 for two", time: "35-40 min", emoji: "🍢", color1: "#6a1fd0", color2: "#ffb238" },
  { name: "Idli Express", cuisine: "south indian", tags: "South Indian · Quick Bites", rating: 4.0, price: "₹180 for two", time: "15-20 min", emoji: "🍚", color1: "#e8912a", color2: "#b34cf0" }
];

const grid = document.getElementById('restaurantGrid');
const resultCount = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const chips = document.querySelectorAll('.category-chip');

let activeFilter = 'all';

function ratingClass(rating){
  if (rating >= 4.3) return 'good';
  if (rating >= 4.0) return '';
  return 'mid';
}

function renderCards(list){
  grid.innerHTML = '';
  list.forEach(r => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-image" style="background:linear-gradient(135deg, ${r.color1}, ${r.color2})">
        <span>${r.emoji}</span>
        <div class="card-fav">🤍</div>
        <div class="card-rating-stamp ${ratingClass(r.rating)}">★ ${r.rating}</div>
      </div>
      <div class="card-body">
        <div class="card-name">${r.name}</div>
        <div class="card-tags">${r.tags}</div>
        <div class="card-footer">
          <span class="card-price">${r.price}</span>
          <span class="card-time">${r.time}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  resultCount.textContent = list.length;
  noResults.hidden = list.length !== 0;
  grid.style.display = list.length === 0 ? 'none' : 'grid';
}

function applyFilters(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = restaurants.filter(r => {
    const matchesCategory = activeFilter === 'all' || r.cuisine === activeFilter;
    const matchesSearch = query === '' ||
      r.name.toLowerCase().includes(query) ||
      r.tags.toLowerCase().includes(query) ||
      r.cuisine.includes(query);
    return matchesCategory && matchesSearch;
  });
  renderCards(filtered);
}

// Category chip clicks
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    applyFilters();
  });
});

// Search interactions
searchBtn.addEventListener('click', applyFilters);
searchInput.addEventListener('input', applyFilters);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') applyFilters();
});

// Favourite heart toggle
grid.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-fav') || e.target.closest('.card-fav')) {
    e.stopPropagation();
    const el = e.target.classList.contains('card-fav') ? e.target : e.target.closest('.card-fav');
    el.textContent = el.textContent === '🤍' ? '❤️' : '🤍';
  }
});

// Initial render
renderCards(restaurants);
