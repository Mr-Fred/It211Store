const config = {
    type: 'carousel',
    perView: 3,
    autoplay: 2000
}

new Glide('.glide', config).mount()

AOS.init();

const search = document.getElementById('search');
search.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    const listings = document.querySelector('.listings');
    products.forEach((product) => {
      const name = product.querySelector('h2').textContent.toLowerCase();
      const description = product.querySelector('p').textContent.toLowerCase();
      if (name.includes(query) || description.includes(query)) {
        product.style.display = 'flex';
      } else {
        product.style.display = 'none';
      }
    });
});