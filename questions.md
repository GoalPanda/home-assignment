## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

> In React, Component and PureComponent are both base classes that can be extended to create reusable UI components.
> The key difference between the two is that PureComponent has a built-in optimization that helps prevent unnecessary re-renders of the component. This is achieved by performing a shallow comparison of the component's props and state to determine whether a re-render is necessary. If no changes are detected, the component will not re-render.
> On the other hand, a Component will always re-render whenever its render() method is called, regardless of whether its props or state have changed. This can potentially result in unnecessary re-renders, which can be a performance bottleneck for larger and more complex applications.
> Here's an example where using Component instead of PureComponent might break your app:
> Suppose you have a large list of items that are displayed on the screen using a ListComponent. Each item is represented by a ListItemComponent that receives some props and state from its parent ListComponent.
> If you use a regular Component for ListItemComponent, it will re-render every time the parent ListComponent re-renders, even if the props passed to it haven't changed. This can lead to unnecessary re-renders and slower performance.
> To avoid this, you could use a PureComponent for ListItemComponent instead. This would prevent unnecessary re-renders and improve the performance of your app.
> However, if the props passed to ListItemComponent contain complex objects or arrays that are frequently updated, the shallow comparison performed by PureComponent may not be sufficient to detect changes. In this case, you might need to use a regular Component and implement your own shouldComponentUpdate method to perform a deeper comparison of the props and state to determine whether a re-render is necessary.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

> Using context and shouldComponentUpdate together can be dangerous because it can lead to unexpected behavior and difficult-to-debug issues.
> context in React is a way to pass data from a parent component down to its descendants without having to pass props explicitly at every level of the tree. Components that rely on context can consume this data through a Consumer component or by using the useContext hook.
> When a component consumes data from context, it becomes coupled to its parent and any changes in the parent can potentially cause a re-render of the child component. This can lead to performance issues if the parent component frequently updates.
> shouldComponentUpdate is a lifecycle method that allows a component to control whether it should re-render or not. It returns a boolean value indicating whether the component should update or not, based on the comparison of the current props and state with the next props and state.
> The problem with using shouldComponentUpdate with context is that changes in the context are not always propagated to the component's props or state. This means that the component may not re-render even though the context has changed, leading to inconsistencies in the UI.
> Additionally, shouldComponentUpdate can be expensive to compute, especially for large components with complex data structures. This can lead to performance issues and slow down the rendering of the entire application.
> To avoid these issues, it's generally recommended to avoid using shouldComponentUpdate with context and instead rely on other techniques, such as using React.memo or PureComponent for performance optimization. If you do need to use shouldComponentUpdate with context, make sure to thoroughly test your component to ensure that it behaves as expected and that changes in the context are correctly propagated to the component's props or state.

## 3. Describe 3 ways to pass information from a component to its PARENT.

> Props: One of the most common ways to pass data from a child component to its parent is through props. Props are properties that are passed down from a parent component to its child components. When a child component needs to send information to its parent component, it can emit an event that includes the data as a prop. The parent component can then access this data by listening for the event and receiving the prop.
> Event Emitters: Another way to pass information from a child component to its parent is through event emitters. Event emitters are a mechanism for emitting custom events in Vue.js, React, and other popular frontend frameworks. When a child component needs to send data to its parent component, it can emit an event using an event emitter. The parent component can then listen for this event and receive the data that was emitted.
> Callback Functions: A third way to pass data from a child component to its parent is through callback functions. In this approach, the child component accepts a callback function as a prop. When the child component needs to send data to its parent, it calls the callback function with the data as an argument. The parent component can then receive the data by defining the callback function and passing it to the child component as a prop.

## 4. Give 2 ways to prevent components from re-rendering.

> Memoization: Memoization is a technique used to optimize expensive function calls by caching their results. In the context of React, it can be used to prevent a component from re-rendering unnecessarily. By wrapping a component with the React.memo() higher-order component, React will only re-render the component if its props have changed. If the props have not changed, the component will be re-used from the memoized cache, preventing unnecessary re-renders.
> Use shouldComponentUpdate: shouldComponentUpdate() is a lifecycle method in React that can be used to prevent a component from re-rendering unnecessarily. By default, React will re-render a component whenever its state or props change. However, you can override this behavior by implementing the shouldComponentUpdate() method and returning false if the component does not need to be re-rendered. This can be useful if you have a component with complex logic or expensive rendering, and you want to prevent it from re-rendering unnecessarily. Note that shouldComponentUpdate() is not available in function components, but you can achieve a similar result with the React.memo() higher-order component.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

> In React, a fragment is a component that lets you group a list of children without adding extra nodes to the DOM. Fragments are useful when you need to return multiple elements from a component but don't want to add an extra parent element to the DOM.
> Here's an example of using fragments in React:

```
import React, { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <h1>Hello</h1>
      <p>World</p>
    </Fragment>
  );
}
```

> In the example above, we are using the Fragment component to group the h1 and p elements without adding an extra parent element to the DOM.
> Fragments are useful when you need to return multiple elements from a component, but adding an extra parent element to the DOM would break the layout or styling. For example, if you are rendering a table with multiple rows, using a parent element to group the rows would cause issues with the table's layout and styling.
> However, there are some cases where using a fragment might break your app. One example is when you are returning an array of elements from a component. If you try to return an array of elements without wrapping them in a parent element or a fragment, React will throw an error.
> For example, the following code will throw an error:

```
import React from 'react';

function App() {
  return [
    <h1 key="1">Hello</h1>,
    <p key="2">World</p>
  ];
}
```

> To fix this, you can wrap the elements in a fragment or a parent element:

```
import React, { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <h1>Hello</h1>
      <p>World</p>
    </Fragment>
  );
}
```

```
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>World</p>
    </div>
  );
}
```

> So, it's important to use fragments (or parent elements) when needed, but also to be aware of cases where they might break your app.

## 6. Give 3 examples of the HOC pattern.

> Authentication HOC: An authentication HOC is a component that can be used to protect certain routes or pages in a React application. The authentication HOC can check if the user is authenticated and authorized to access the protected route, and if not, it can redirect the user to a login page. The authentication HOC can be used to wrap any component that needs to be protected, and it can provide the necessary props and functions to access the user's authentication status and redirect the user if needed.
> Logging HOC: A logging HOC is a component that can be used to log events or actions in a React application. The logging HOC can be used to wrap any component that needs to log events or actions, and it can provide a function to log the events or actions to a remote server or local storage. The logging HOC can also add additional metadata to the logged events or actions, such as the user's ID or IP address.
> Styling HOC: A styling HOC is a component that can be used to apply a common style or theme to multiple components in a React application. The styling HOC can wrap any component that needs to use the common style or theme, and it can provide props and functions to access the style or theme settings. The styling HOC can also handle changes to the style or theme settings and update the wrapped components accordingly.
> These are just a few examples of the many ways that the HOC pattern can be used in React. HOCs are a powerful pattern that can help you reuse code, add functionality, and manage state in your React applications.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

> Promises, callbacks, and async/await are all ways to handle asynchronous code in JavaScript. Each approach has its own way of handling exceptions.
> Here are the main differences:
> Callbacks: In the callback approach, error handling is typically done by passing an error object as the first argument to the callback function. If there is no error, the first argument will be null or undefined. For example:

```
function getData(callback) {
  // Do some asynchronous operation
  if (error) {
    callback(error, null);
  } else {
    callback(null, result);
  }
}
```

> Promises: In the promise approach, you can handle errors by chaining a .catch() method at the end of the promise chain. If any error is thrown in the promise chain, the catch block will be executed. For example:

```
getData()
  .then(result => {
    // Do something with the result
  })
  .catch(error => {
    // Handle the error
  });
```

> Async/await: In the async/await approach, you can handle errors by wrapping the asynchronous code in a try-catch block. If any error is thrown inside the try block, the catch block will be executed. For example:

```
async function getData() {
  try {
    const result = await someAsyncOperation();
    // Do something with the result
  } catch (error) {
    // Handle the error
  }
}
```

> In summary, callbacks use the first argument of the callback function to handle errors, promises use the .catch() method to handle errors, and async/await use try-catch blocks to handle errors.

## 8. How many arguments does setState take and why is it async.

> In React, the setState() method is used to update the state of a component. It takes two arguments:
>
> -A state object or a function that returns a state object.
> -An optional callback function that will be called once the state update has been applied.
> For example:

```
this.setState({ count: this.state.count + 1 }, () => {
  console.log('State has been updated:', this.state);
});
```

> or:

```
this.setState(prevState => {
  return { count: prevState.count + 1 };
}, () => {
  console.log('State has been updated:', this.state);
});
```

> It's important to note that setState() is asynchronous in nature. When you call setState(), React will schedule a state update and then re-render the component. This means that the state update may not happen immediately and you should not assume that the state has been updated right after calling setState(). Instead, you should use the optional callback function to perform any actions that depend on the updated state.
> The reason why setState() is asynchronous is that it allows React to optimize the performance of the application by batching multiple state updates together. For example, if you call setState() multiple times in a row, React will batch all the updates together and then perform a single re-render of the component, instead of re-rendering the component multiple times for each individual state update. This can lead to significant performance improvements, especially in complex applications.

## 9. List the steps needed to migrate a Class to Function Component.

> To migrate a class component to a function component in React, you can follow these general steps:
> -Identify the state variables in the class component.
> -Remove the class declaration and replace it with a function declaration.
> -Remove the render() method and return the JSX directly from the function.
> -Remove the this keyword from the state variable references and replace them with the variable name.
> -Replace the this.setState() method calls with calls to React's useState() hook to manage the state.
> -Remove the constructor() method and initialize the state using the useState() hook in the function body.
> -Remove any lifecycle methods that are not necessary for the component functionality.
> -Remove the propTypes and defaultProps declarations and replace them with the appropriate propType validation and default value assignment in the function declaration.
> -Remove the ref usage from the component, as it is not supported in function components.
> -Refactor any other class-specific syntax, such as this.props, this.context, or super() calls, as needed for the function component.

> Here's an example of what the migration might look like:

```
// Class component
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.handleClick()}>Increment</button>
      </div>
    );
  }
}

// Function component
function MyComponent(props) {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => handleClick()}>Increment</button>
    </div>
  );
}

MyComponent.propTypes = {
  // propType validation
};

MyComponent.defaultProps = {
  // default value assignment
};
```

## 10. List a few ways styles can be used with components.

> There are several ways to apply styles to components in React:
> Inline styles: You can use the style attribute in JSX to apply inline styles directly to an element. For example:

```
<div style={{ backgroundColor: 'blue', color: 'white' }}>Hello, world!</div>
```

> CSS classes: You can define CSS classes using a stylesheet and then apply them to elements using the className attribute in JSX. For example:

```
// In a stylesheet file
.myClass {
  background-color: blue;
  color: white;
}

// In JSX
<div className="myClass">Hello, world!</div>
```

> CSS modules: CSS modules allow you to write CSS styles that are scoped to a specific component, avoiding naming collisions and style pollution. You can import the CSS module and apply the styles using the className attribute in JSX. For example:

```
// In a CSS module file
.myClass {
  background-color: blue;
  color: white;
}

// In a component file
import styles from './myStyles.module.css';

function MyComponent() {
  return <div className={styles.myClass}>Hello, world!</div>;
}
```

> CSS-in-JS libraries: There are several libraries that allow you to write CSS styles directly in your JavaScript code. These libraries provide benefits such as dynamic styling, theme support, and more. Some popular CSS-in-JS libraries include styled-components, emotion, and JSS.

## 11. How to render an HTML string coming from the server.

> In React, you can render an HTML string that is received from the server by using the dangerouslySetInnerHTML attribute. However, it's important to use this attribute with caution, as it can be a security risk if not used properly.
> Here's an example of how to render an HTML string using dangerouslySetInnerHTML:

```
function MyComponent(props) {
  const htmlString = props.htmlString; // assume this is the HTML string received from the server

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```

> In the above example, the dangerouslySetInnerHTML attribute is used to set the innerHTML property of the <div> element to the value of htmlString. Note that the \_\_html property is a special property used to indicate that the value should be treated as raw HTML and not escaped.
> It's important to note that using dangerouslySetInnerHTML can be risky if the HTML string contains user-generated content, as it can potentially allow cross-site scripting (XSS) attacks. To mitigate this risk, it's recommended to sanitize the HTML string on the server before sending it to the client, or to use a library that provides safe HTML rendering, such as DOMPurify or sanitize-html.
