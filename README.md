# Dinner Dash Project

Welcome to Dinner Dash! This project is a web application that facilitates ordering food items from various restaurants. It provides functionalities for both unauthenticated users and authenticated users, including administrators. Here's a breakdown of the key features:

## Functionalities

### Unauthenticated Users

As an unauthenticated user, you can:

- Browse all items and items in a specific restaurant
- Browse items by category
- Add items to your cart (only from one restaurant at a time)
- View your cart
- Remove items from your cart
- Increase the quantity of items in your cart
- View popular items (items with the most order count)
- Log in (which doesn't clear the cart)
- Clear your cart (remove all selected items)

Unauthenticated users cannot:

- View another user's private data
- Checkout (until they log in)
- Access administrator screens or functionalities

### Authenticated Users (Non-Administrators)

As an authenticated user, you can do everything an unauthenticated user can do, except "log in." Additionally, you can:

- Log out
- Have your cart synced across sessions (if you log out and log back in from another device)
- View your past orders, including details such as items ordered, order status, and more
- Access item description pages from the order display
- View the current status of an order
- See the total order price and submission timestamp
- Access items that are retired (but cannot add them to a new cart)

Authenticated users (non-administrators) cannot:

- View another user's private data
- Access administrator screens or functionalities
- Make themselves an administrator

### Administrators

As an authenticated administrator, you can:

- Create new item listings with details such as name, description, price, and photos
- Create different restaurants
- Add items to specific restaurants
- Modify existing items' information (name, description, price, photos)
- Create named categories for items (e.g., "Small Plates")
- Assign or remove items from categories
- Retire items from being sold (hides them from non-administrator browsing)
- View an order dashboard with order details, statuses, and actions
- Filter orders by status (e.g., "ordered," "paid," "cancelled," "completed")
- Transition orders to different statuses (cancel, mark as paid, mark as completed)
- Access details of individual orders, including purchaser information and item details

Administrators cannot:

- Modify personal data of other users

## Installation and Usage

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using your preferred package manager:

```bash
npm install
# or
yarn install
```

```bash
npm start

# or

yarn start
```
