# Cart

## Cart Concept

The cart feature give you the basic functionality that any cart need.
The basic redux actions and saga already built-in in harmony.
- `\src\actions\redux\cart`
- `\src\actions\sagas\cart`

### Redux Actions
`\src\actions\redux\cart`

- `setCartId`
- `addToCart`
- `updateCart`
- `removeFromCart`
- `clearCart`

### Saga Actions
`\src\actions\sagas\cart`

- `addSaga` - add item to cart
- `removeSaga` - remove item from cart
- `clearSaga` - clear cart

### Define the Item Interface

in `\src\actions\redux\cart\interfaces.ts` 

you can define the structure of each item/s

```typescript
interface CartItem {
	id: number | string;
	brand: string;
	name: string;
	description: string;
	image?: string;
	price: number;
	quantity?: number;
}
```

!!! tip "Remember - Cart Feature created to provide you basic actions that any cart should have. you can do anything with that sagas for your project needed. The main purpose of that cart is give you fast starter kit with cart."


### Cart in Store Example

```js
{
  cart: {
    items: [
      {
        id: 'Yezz LIV1',
        name: 'Yezz LIV1',
        price: 316,
        description: 'TFT capacitive touchscreen, 16M colors Available. Released 2019, September',
        brand: 'Yezz',
        image: '/assets/images/src/actions/sagas/catalog/generic-mobile.jpg',
        quantity: 1
      },
      {
        id: 'Xiaomi Redmi 8A',
        name: 'Xiaomi Redmi 8A',
        price: 96.99,
        description: 'IPS LCD capacitive touchscreen, 16M colors Available. Released 2019, September',
        brand: 'Xiaomi',
        image: '/assets/images/src/actions/sagas/catalog/generic-mobile.jpg',
        quantity: 1
      },
      {
        id: 'Samsung Galaxy A70s',
        name: 'Samsung Galaxy A70s',
        price: 876,
        description: 'Super AMOLED capacitive touchscreen, 16M colors Available. Released 2019, September',
        brand: 'Samsung',
        image: '/assets/images/src/actions/sagas/catalog/generic-mobile.jpg',
        quantity: 1
      }
    ],
    cartId: '2467654'
  }
}
```
