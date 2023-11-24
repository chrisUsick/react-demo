# React Demo

This is demo of how things are done in react. 
It looks to demonstrate the following tasks/functions of a Frontend Framework:

- Installation and local development 
- Components/Structure 
- Local State 
- Global State 
- Interactions (HTTP requests)
- Unit testing

## Setup 

Prerequisites
- nodejs installed 

Start a project 
```
npm create vite@latest
# pick react + typescript + swc 
```

## Explore the repo 

package.json 
Starts off with only react as the deps 

```json 
{
  "name": "react-demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react-swc": "^3.3.2",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
```

## Components 

React renders view elements as Components. 
Components are pure functions 
- side effects happen in "Hooks" (see below)
- State is passed down, not up; i.e. 1-way state binding 


```typescript 
function Hello(props: { name: string } ) {
  return <div>Hello { props.name } </div>
}

export default Hello
```

## Hooks 

React uses the concept of Hooks to organize business logic. 
Think:
- components are for view rendering logic
- all other logic lives in hooks 

Key hooks to know:
- `useState()`
- `useCallback()`
- `useEffect()`
- `useContext()`

## Local state

```tsx 
import { useState } from "react";

function Counter( props: { initialCount: number } ) {
  const [count, setCount] = useState(props.initialCount)
  return (
    <div>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </div>
  )
}

export default Counter
```

For simple state, you can call hooks inside your component. 
For More complex state you can define you own hooks. 

Example: here's a component that stores some state to local storage. 
First, a "custom hook" is created: all it takes is a regular function. 
The "use" prefix is just a convention. 

```tsx
import { useEffect, useState } from "react";

function usePersistentState(key: string, defaultValue: number) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];

}

function PersistentCounter() {
  const [count, setCount] = usePersistentState("count", 0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default PersistentCounter
```

## Global State

In React, state is unidirectional: data flows from parents to children, not back up. 
Still, sometimes we need shared state between 2 components. This can be solved with `Context`s. 

See `AuthContext.tsx` for how a context gets created. 
Then, the `Header` and `NameTag` component both call `useContext(AuthContext)`. 
The `Header` component invokes the `login()` function, which updates the auth state. 
The `NameTag` component only reads the current user, and if defined displays user information. 

```tsx 
import { useContext } from "react"
import { AuthContext } from "./AuthContext"

function Header() {
  const { user, login } = useContext(AuthContext)
  if (!user) 
    return (
      <div className="header">
        Please login
        <button onClick={() => login({name: 'Joe Smith', email: 'joe@example.com'})}>Login</button>
      </div>
    )
  return (
    <div className="header">
      email: {user?.email}
    </div>
  )
}

export default Header
```

```tsx 
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function NameTag() {
  const {user} = useContext(AuthContext);
  if (!user) return <div>Please login</div>
  return (
    <div>
      <h3>Name Tag</h3>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  )
}

export default NameTag
```

# Unit testing 

TL;DR:
- Install packages 
- add tests/setup.js 
- update vite.config.ts 
- update package.json 
- write unit test like `PersistentCounter.test.tsx`

```
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

package.json 
```
...
    "test": "vitest"
...
```

add vitest to vite.config.ts
```
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});
```


# HTTP Calls and APIs 