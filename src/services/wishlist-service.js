// Definimos la clave de almacenamiento para el wishlist en localStorage
const WISHLIST_STORAGE_KEY = "wishlist";

export const getWishlist = () => {
    // Obtener la wishlist desde localStorage
    const wishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (product) => {
    // Obtener la wishlist actual
    const wishlist = getWishlist();
    // Comprobar si el producto ya existe para evitar duplicados
    const productExists = wishlist.find(item => item.uid === product.uid);
    if (!productExists) {
        // Añadir el producto a la wishlist
        wishlist.push(product);
        // Guardar la nueva wishlist en localStorage
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
    return wishlist
};

export const addToWishlistInBulk = (products) => {
    // Obtener la wishlist actual
    const wishlist = getWishlist();
    products.forEach(product => {
        // Comprobar y añadir productos si no existen
        const productExists = wishlist.find(item => item.uid === product.uid);
        if (!productExists) {
            wishlist.push(product);
        }
    });
    // Guardar la nueva wishlist en localStorage
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
};

export const removeFromWishlist = (productId) => {
    // Obtener la wishlist actual
    const wishlist = getWishlist();
    // Filtrar para eliminar el producto especificado por productId
    const updatedWishlist = wishlist.filter(item => item.uid !== productId);
    // Guardar la wishlist actualizada en localStorage
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));
    return updatedWishlist;
};

export const isProductInWishlist = (productId) => {
    const wishlist = getWishlist();
    return wishlist.some(item => item.uid === productId);
};
