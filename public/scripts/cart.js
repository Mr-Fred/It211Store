function deleteProduct(productId) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      const form = document.getElementById(`deleteForm${productId}`);
      form.submit();
    }
}