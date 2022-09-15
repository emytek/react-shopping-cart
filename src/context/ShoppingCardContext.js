import { createContext, useState, useContext } from 'react'
import { ShoppingCart } from '../components/ShoppingCart'


const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const[isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    //   "shopping-cart",
    //   []
    // )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
        //counting all the diff quantities for every item in the cart
    )

    function getItemQuantity(id){
        return cartItems.find(item => item.id === id)?.quantity || 0
        // find the current id and if we have that id, return the quantity, otherwise return a default value of 0
    }

    function increaseCartQuantity(id) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            // if the current item does not exist in the cart..then we need to add it to the cart
            // otherwise if the item exist, increment the count of that item by 1
            return [...currItems, { id, quantity: 1 }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }

      function decreaseCartQuantity(id) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id)?.quantity === 1) {
            // if the quantity is 1, then get rid of it
            return currItems.filter(item => item.id !== id)
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }

    function removeFromCart(id) {
        setCartItems(currItems => {
          return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart, 
            cartItems, 
            cartQuantity,
            openCart,
            closeCart
            }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )

}
