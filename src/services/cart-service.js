
// Definimos la clave de almacenamiento para el wishlist en localStorage
const CARTLIST_STORAGE_KEY = "cartlist";

export const getCartlist = () => {
  // Obtener la wishlist desde localStorage
  const wishlist = localStorage.getItem(CARTLIST_STORAGE_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToCartlist = (product) => {
  // Obtener la wishlist actual
  const wishlist = getCartlist();
  // Comprobar si el producto ya existe para evitar duplicados
  const productExists = wishlist.find(item => item.uid === product.uid);
  if (!productExists) {
    // Añadir el producto a la wishlist
    wishlist.push(product);
    // Guardar la nueva wishlist en localStorage
    localStorage.setItem(CARTLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }
  return wishlist
};

export const removeFromWishlist = (productId) => {
  // Obtener la wishlist actual
  const wishlist = getCartlist();
  // Filtrar para eliminar el producto especificado por productId
  const updatedWishlist = wishlist.filter(item => item.uid !== productId);
  // Guardar la wishlist actualizada en localStorage
  localStorage.setItem(CARTLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));
  return updatedWishlist;
};

export const isProductInCertlist = (productId) => {
  const wishlist = getCartlist();
  return wishlist.some(item => item.uid === productId);
};
export const changeItemQuantity = (productId, changeType) => {
};

export const getTotalAmount = (payload) => {
  const amounts= payload.reduce(
    (acc, item) => ({
      totalAmount: item.price * item.qty + acc.totalAmount,
      discountedAmount:
        (item.price - item.discount) * item.qty + acc.discountedAmount,
    }),
    {
      totalAmount: 0,
      discountedAmount: 0,
    }
  );
  return amounts
};

export const createCouponData = (payload) => {
  const itemsLength = payload.length;
  let coupons = [
    {
      name: "Free Delivery",
      value: 50,
    },
    {
      name: "Bookworms",
      value: 100,
    },
  ];
  switch (true) {
    case itemsLength === 3:
      coupons = [...coupons, { name: "3 Combo", value: 150 }];
      break;

    case itemsLength === 4:
      coupons = [...coupons, { name: "4 Combo", value: 250 }];
      break;

    case itemsLength > 4:
      coupons = [...coupons, { name: "Bibliophilia", value: 500 }];
      break;

    default:
      coupons = [...coupons];
      break;
  }

  return coupons;
};
