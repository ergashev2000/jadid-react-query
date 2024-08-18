# React Query Library

This library provides a set of custom hooks and utilities for managing server state in React applications. It includes the `useQuery`, `useMutation`, `useInfiniteQuery`, and `useManualQuery` hooks, along with a `QueryClientProvider` to manage the state globally.

## Features

- **Custom Query Hooks**: Provides `useQuery`, `useMutation`, `useInfiniteQuery`, and `useManualQuery` hooks.
- **Global State Management**: Integrates a `QueryClient` for managing state globally across the application.
- **Automatic Refetching**: Hooks include options for automatic refetching, background synchronization, and more.

## Installation

Install the package via npm or yarn:

```bash
npm install jadid-react-query
```

or

```bash
yarn install jadid-react-query
```


# Setup

To use the hooks provided by this library, wrap your application in the `QueryClientProvider` component.

```
import Example from "./components/example";
import { queryClient, QueryClientProvider } from "jadid-react-query";

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
    </>
  );
}
```

```
import { useQuery } from 'jadid-react-query';

const MyComponent = () => {
  const { data, error, loading, refetch } = useQuery(
    'unique-key',
    'https://api.example.com/data',
    {
      ttl: 10000,
      refetchOnWindowFocus: true,
      refetchInterval: 60000,
      backgroundSync: true,
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```


# Hooks

## useQuery

The `useQuery` hook is a powerful tool for fetching, caching, and managing server data in your React applications. It offers a variety of options for controlling the behavior of data fetching, including refetching on window focus, background synchronization, and more.


### Signature


```
const { data, error, loading, refetch } = useQuery(
  key: string,
  url: string,
  options?: UseQueryOptions
);
```

### Parameters
- **key: string**
- A unique identifier for the query. This key is used to cache and retrieve data within the application. It must be unique for each query.


- **url: string**
- The endpoint URL from which the data is to be fetched.


- **options: UseQueryOptions (optional)**
- An object containing various configuration options to control the behavior of the hook.


`UseQueryOptions` Interface

```
export interface UseQueryOptions {
  enabled?: boolean; // Default: true
  refetchOnWindowFocus?: boolean; // Default: false
  refetchOnReconnect?: boolean; // Default: true
  staleTime?: number; // Default: 5000 (ms)
  cacheTime?: number; // Default: 10000 (ms)
  refetchInterval?: number; // Default: 0 (ms)
  backgroundSync?: boolean; // Default: true
  retry?: number; // Default: 3
  retryDelay?: number; // Default: 1000 (ms)
  [key: string]: any; // Other fetch options
}
```


## Usage

### Basic Usage
The most basic use case involves fetching data from a given URL and displaying it in a component.

```
import React from "react";
import { useQuery } from "your-package-name";

const MyComponent = () => {
  const { data, error, loading, refetch } = useQuery(
    "unique-key",
    "https://api.example.com/data"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```


### Configuration Options

`enabled (boolean)`

- **Controls whether the query is enabled. If false, the query will not automatically run. You can enable it later or trigger a manual fetch using the refetch function.**

```
const { data, refetch } = useQuery("key", "https://api.example.com", {
  enabled: false
});

refetch();
```


`refetchOnWindowFocus (boolean)`

- **If set to true, the query will refetch data whenever the window regains focus. This is useful for keeping the data up-to-date when users switch between browser tabs.**

```
useQuery("key", "https://api.example.com", {
  refetchOnWindowFocus: true
});
```


`staleTime (number)`

- **Defines how long the fetched data is considered fresh (in milliseconds). After this period, the data is considered stale and will be refetched the next time it is accessed.**

```
useQuery("key", "https://api.example.com", {
  staleTime: 10000 // 10 seconds
});
```


`cacheTime (number)`

- **Determines how long the data should be cached in memory (in milliseconds). If a query is not accessed within this time, the cached data will be garbage collected.**

```
useQuery("key", "https://api.example.com", {
  cacheTime: 60000 // 1 minute
});
```


`refetchInterval (number)`

- **Defines the interval at which the query should refetch data (in milliseconds). If set to `0`, no automatic refetching will occur.**

```
useQuery("key", "https://api.example.com", {
  refetchInterval: 30000 // Refetch every 30 seconds
});
```


`backgroundSync (boolean)`

- **If `true`, the query will automatically refetch data when the browser comes online after being offline.**

```
useQuery("key", "https://api.example.com", {
  backgroundSync: true
});
```

`retry (number)`

- **The number of retry attempts if the fetch operation fails.**

```
useQuery("key", "https://api.example.com", {
  retry: 5 // Retry up to 5 times
});
```


`retryDelay (number)`

- **The delay between retry attempts (in milliseconds).**

```
useQuery("key", "https://api.example.com", {
  retryDelay: 2000 // 2 seconds delay between retries
});
```


### Example: Custom Fetch Options

You can pass additional fetch options (e.g., headers) through the options parameter.

```
useQuery("key", "https://api.example.com", {
  headers: {
    Authorization: "Bearer my-token"
  }
});
```



# useMutation

The `useMutation` hook simplifies handling mutations (e.g., POST, PUT, DELETE) in your React apps by managing loading states, errors, and callbacks.


### Parameters

**key**: Unique identifier for the mutation.
**url**: API endpoint.
**options**: Optional settings:
- **onSuccess**: Callback on successful mutation.
- **onError**: Callback on mutation failure.
- **onSettled**: Callback after mutation completion (success or failure).

### Return Values:
- **data**: Response data from the mutation.
- **error**: Error encountered during mutation.
- **loading**: Boolean indicating if the mutation is in progress.
- **mutate**: Function to trigger the mutation, accepting a payload.


### Usage Example:

```
const { data, error, loading, mutate } = useMutation(
  "createUser",
  "/api/users",
  {
    onSuccess: (data) => console.log("Success:", data),
    onError: (error) => console.error("Error:", error),
  }
);

const handleSubmit = (user) => mutate(user);
```


### Example: Using useMutation for DELETE Requests

```
const { data, error, loading, mutate } = useMutation(
  "deleteUser",
  "/api/users/123",
  {
    onSuccess: () => console.log("User deleted successfully"),
    onError: (error) => console.error("Error deleting user:", error),
  }
);

const handleDelete = () => {
  mutate(null, { method: "DELETE" });
};
```


### Example: Using useMutation for UPDATE Requests

```
const { data, error, loading, mutate } = useMutation(
  "updateUser",
  "/api/users/123",
  {
    onSuccess: () => console.log("User updated successfully"),
    onError: (error) => console.error("Error updating user:", error),
  }
);

const handleUpdate = () => {
  const updatedData = {
    name: "Updated Name",
    email: "updated@example.com",
  };

  mutate(updatedData, { method: "PUT" }); // or use method: "PATCH" for partial updates
};
```


This hook helps you easily manage API mutations with built-in support for success, error handling, and loading state management.


`useInfiniteQuery`

The useInfiniteQuery hook allows for paginated data fetching, supporting infinite scroll implementations.


### Example Usage

```
import React from "react";
import { useInfiniteQuery } from "./hooks/useInfiniteQuery";

const fetchPosts = async (page: number) => {
  const response = await fetch(`/api/posts?page=${page}`);
  return response.json();
};

const InfiniteScrollComponent = () => {
  const { data, loading, error, loadMore, hasNextPage } = useInfiniteQuery({
    queryKey: "posts",
    fetchFunction: fetchPosts,
    pageSize: 10,
  });

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}

      {hasNextPage && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
};

export default InfiniteScrollComponent;
```


## useManualQuery

The `useManualQuery` hook is a custom React hook designed to allow manual fetching of data with built-in support for caching, error handling, and various fetch options. It's similar to useQuery, but it doesn't automatically fetch data on mount—instead, it provides a refetch function that you can call manually.

```
import React from 'react';
import { useManualQuery } from './hooks/useManualQuery';

const fetchUserData = async () => {
  const response = await fetch('/api/user');
  return response.json();
};

const UserComponent = () => {
  const { data, error, loading, refetch } = useManualQuery(
    'user',
    '/api/user',
    { enabled: false }
  );

  return (
    <div>
      <button onClick={refetch}>Fetch User Data</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data: {error.message}</p>}
      {data && <div>{data.name}</div>}
    </div>
  );
};

export default UserComponent;
```


# API Reference

`QueryClient`
The QueryClient class provides methods and properties to manage query state globally.

`QueryClientProvider`
A React component that provides the QueryClient to your application.

`useQuery`
A hook for fetching and caching data.

`useMutation`
A hook for handling mutations.

`useInfiniteQuery`
A hook for handling infinite scroll/pagination.

`useManualQuery`
A hook for manual query triggering.


# Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.


# License

This project is licensed under the MIT License - see the LICENSE([https://opensource.org/license/mit]) file for details.