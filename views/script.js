function addToCart(item) {
 cartItems.push(item);
 document.getElementById("itemCounter").innerHTML = cartItems.length;
 showTotal();
}

function clickCart() {
 isTotalHidden = !isTotalHidden;
 showTotal();
}

  {
 let orderTotal = document.getElementById("orderTotal");
 orderTotal.innerHTML = "";
 
 if (isTotalHidden === false) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
   total += cartItems[i].price;
  }
  orderTotal.innerHTML += "Total: $" + total;
 }
}

