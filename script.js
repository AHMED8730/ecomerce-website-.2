let cart=[];

function money(n){return "$"+n.toFixed(2)}

function addToCart(name,price){
  const item=cart.find(x=>x.name===name);
  if(item)item.qty++;
  else cart.push({name,price,qty:1});
  updateCart();
  showToast(name+" added to your bag.");
}

function updateCart(){
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  document.getElementById("cartCount").textContent=count;
  const box=document.getElementById("cartItems");
  if(!cart.length){
    box.innerHTML='<div class="cart-empty"><i class="bi bi-bag"></i>Your bag is currently empty.</div>';
    document.getElementById("cartTotal").textContent="$0.00";
    return;
  }
  box.innerHTML=cart.map((item,i)=>`
    <div class="cart-item">
      <div><h6>${item.name}</h6><small>${money(item.price)} × ${item.qty}</small></div>
      <div class="text-end"><strong>${money(item.price*item.qty)}</strong><br>
      <button class="remove" onclick="removeItem(${i})"><i class="bi bi-trash3"></i></button></div>
    </div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}

function removeItem(index){cart.splice(index,1);updateCart()}

function toggleWish(button){
  button.classList.toggle("liked");
  button.innerHTML=button.classList.contains("liked")?'<i class="bi bi-heart-fill"></i>':'<i class="bi bi-heart"></i>';
}

function filterProducts(category,button){
  const cards=document.querySelectorAll(".product-item");
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  if(button)button.classList.add("active");
  let visible=0;
  cards.forEach(card=>{
    const show=category==="All"||card.dataset.category===category;
    card.style.display=show?"block":"none";
    if(show)visible++;
  });
  document.getElementById("noResults").classList.toggle("d-none",visible>0);
  document.getElementById("shop").scrollIntoView({behavior:"smooth",block:"start"});
}

document.getElementById("searchInput").addEventListener("input",function(){
  const query=this.value.toLowerCase().trim();
  const cards=document.querySelectorAll(".product-item");
  let visible=0;
  cards.forEach(card=>{
    const match=card.dataset.name.toLowerCase().includes(query)||card.dataset.category.toLowerCase().includes(query);
    card.style.display=match?"block":"none";
    if(match)visible++;
  });
  document.getElementById("noResults").classList.toggle("d-none",visible>0);
});

document.getElementById("newsletterForm").addEventListener("submit",function(e){
  e.preventDefault();
  const email=document.getElementById("email").value.trim();
  const msg=document.getElementById("formMsg");
  if(!email.includes("@")){msg.textContent="Please enter a valid email address.";return}
  msg.textContent="You're on the list. Welcome to the Velora letter.";
  this.reset();
});

function checkout(){
  if(!cart.length){showToast("Your bag is empty.");return}
  showToast("Checkout demo — order ready to place.");
}

function showToast(message){
  document.getElementById("toastText").textContent=message;
  bootstrap.Toast.getOrCreateInstance(document.getElementById("toast"),{delay:2200}).show();
}

updateCart();

const nav=document.querySelector(".main-nav");
window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",window.scrollY>15));

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",()=>{
    const menu=document.getElementById("navMenu");
    if(menu.classList.contains("show")){
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
