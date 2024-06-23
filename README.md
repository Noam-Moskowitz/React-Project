# Bcard Project

## Overview

Bcard is a web application built with React, Material UI, Tailwind CSS, JavaScript, Redux, React Router DOM, and JWT Decode. The app allows users to register, log in, and update their user information. Users can view business cards from a database, add them to favorites, and manage them if they have the appropriate permissions. The application also features light and dark mode switching and comprehensive form validation.

## Features

- **User Authentication**: Register, log in, and update user information.
- **Token Management**: Tokens are stored in local storage and decoded into global state using a custom hook `useApi`.
- **Business Cards**: View business cards, add to favorites, and remove from favorites.
- **Business Account Management**: Create, edit, and delete own business cards.
- **Admin Management**: Access to a sandbox area to view, edit, and delete all users.
- **Search Functionality**: Search through cards and users in the sandbox area.
- **Theme Switching**: Switch between light and dark modes.
- **Form Validation**: All forms are managed by a custom hook `useValidation`.

## Technologies Used

- **React**
- **Material UI**
- **Tailwind CSS**
- **JavaScript**
- **Redux**
- **React Router DOM**
- **JWT Decode**

## Custom Hooks

- **useApi**: Manages API calls, token storage, and token decoding.
- **useValidation**: Manages form validation.
- **Theme Hooks**: Manage theme switching and tracking in global state.

  ## Usage

1. **Register and Log In**: Create an account and log in to access the app's features.
2. **View Business Cards**: Browse through various business cards.
3. **Manage Favorites**: Add or remove business cards from your favorites.
4. **Business Account Actions**: If you have a business account, you can create, edit, and delete your own business cards.
5. **Admin Actions**: As an admin, you can manage all users from the sandbox area.
6. **Search**: Use the search functionality to find specific cards or users.
7. **Theme Switching**: Toggle between light and dark modes.

## File Structure

```
src/
│
├── app.css
├── app.js
├── index.css
├── index.js
│
├── utils/
│   └── utils.js
│
├── theme/
│   └── theme.js
│
├── store/
│   ├── general store
│   ├── slices/
│   │   ├── user authorization
│   │   ├── theme
│   │   └── search value
│
├── models/
│   └── request object class
│
├── hooks/
│   ├── useApi.js
│   ├── useValidation.js
│   └── other hooks
│
└── components/
    ├── all components created for project
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bcard.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bcard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server:
```bash
npm start
```








---
