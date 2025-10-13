const sampleProducts = [
  { id: 1, name: 'Minimal Leather Bag', desc: 'Handcrafted full-grain leather tote.', price: 129.0, img: '/images/bag.svg', tag: 'Lifestyle' },
  { id: 2, name: 'Vintage Sunglasses', desc: 'UV400 protected classic frames.', price: 59.0, img: '/images/sunglasses.svg', tag: 'Accessories' },
  { id: 3, name: 'Sport Sneakers', desc: 'Lightweight running shoes.', price: 89.0, img: '/images/shoes.svg', tag: 'Sports' },
  { id: 4, name: 'Wireless Headphones', desc: 'Noise-cancelling over-ear headphones.', price: 199.0, img: '/images/headphones.svg', tag: 'Audio' }
];

function renderProducts(containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '';
  sampleProducts.forEach(p => {
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div style="display:flex;justify-content:space-between;align-items:start;gap:12px">
        <div style="flex:1">
          <h3>${p.name}</h3>
          <div class="muted" style="margin-top:6px">${p.desc}</div>
        </div>
        <div style="text-align:right">
          <div class="tag">${p.tag}</div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px">
        <div class="price">$${p.price.toFixed(2)}</div>
        <div class="actions">
          <button class="btn-outline" onclick="viewProduct(${p.id})">View</button>
          <button class="btn" onclick="addToCart(${p.id})">Add to cart</button>
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

const cart = [];
function addToCart(id){
  const item = sampleProducts.find(p=>p.id===id);
  if(!item) return;
  cart.push(item);
  updateCartCount();
  alert(`${item.name} added to cart`);
}
function updateCartCount(){
  const el = document.getElementById('cart-count');
  if(el) el.textContent = cart.length;
}
function viewProduct(id){
  const p = sampleProducts.find(x=>x.id===id);
  if(!p) return alert('Product not found');
  alert(`${p.name}\n\n${p.desc}\n\nPrice: $${p.price.toFixed(2)}`);
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts('products-container');
  updateCartCount();
  // fill username greeting if present
  const uname = sessionStorage.getItem('username') || 'Admin';
  const uel = document.getElementById('usernameDisplay');
  if(uel) uel.textContent = uname;
});
