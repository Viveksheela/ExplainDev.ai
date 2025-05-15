import { Term } from '../types/Term';

const mockTerms: Term[] = [
  {
    id: '1',
    name: 'REST API',
    slug: 'rest-api',
    category: 'backend',
    shortDescription: 'A standardized approach for applications to communicate over HTTP',
    simpleExplanation: 'REST API is a way for different software applications to talk to each other over the internet using standard HTTP methods like GET, POST, PUT, and DELETE.',
    technicalExplanation: 'REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations (Create, Read, Update, Delete) on resources, which are identified by URIs. They typically return data in JSON or XML format, are stateless, and rely on standard HTTP methods and status codes.',
    analogy: `Imagine a restaurant where:

- The **menu** is like the API documentation that tells you what's available
- Your **order** is the API request asking for specific items
- The **waiter** is the API handling your request
- The **food** you receive is the response data

You communicate with the kitchen (server) through a standardized system (HTTP methods) that everyone understands, without needing to know how the kitchen prepares your food.`,
    codeExample: `// Example API request using fetch
fetch('https://api.example.com/products/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    tags: ['api', 'http', 'web', 'backend', 'json'],
    resources: [
      {
        title: 'RESTful API Design Best Practices',
        url: 'https://restfulapi.net/',
        description: 'Comprehensive guide to REST API design'
      },
      {
        title: 'MDN Web Docs: HTTP',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
        description: 'Detailed information about HTTP protocol'
      }
    ],
    createdBy: 'system',
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'React Hooks',
    slug: 'react-hooks',
    category: 'frontend',
    shortDescription: 'Functions that let you use state and lifecycle features in functional components',
    simpleExplanation: 'React Hooks are special functions that allow you to use React features like state management and side effects in functional components, instead of having to write class components.',
    technicalExplanation: 'Introduced in React 16.8, Hooks are functions that "hook into" React state and lifecycle features from function components. They don\'t work inside classes. Popular hooks include useState (for state management), useEffect (for side effects), useContext (for context), useReducer (for complex state logic), useRef (for mutable refs), and many more. Custom hooks can be created to reuse stateful logic between components.',
    analogy: `Think of hooks like fishing hooks that let you "catch" and use different React features:

- **useState** is like a magic sticky note that remembers information even when other things change
- **useEffect** is like setting up automatic reminders to do something when certain conditions are met
- **useContext** is like having access to family knowledge that everyone shares without having to explicitly pass it around

Just as different fishing hooks are designed for different fish, different React hooks are designed for different purposes in your application.`,
    codeExample: `import React, { useState, useEffect } from 'react';

function Counter() {
  // Use state hook to manage count
  const [count, setCount] = useState(0);
  
  // Use effect hook for side effects
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
    
    // Cleanup function (optional)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    tags: ['react', 'frontend', 'javascript', 'hooks', 'state'],
    resources: [
      {
        title: 'React Hooks Documentation',
        url: 'https://reactjs.org/docs/hooks-intro.html',
        description: 'Official documentation for React Hooks'
      },
      {
        title: 'Thinking in React Hooks',
        url: 'https://wattenberger.com/blog/react-hooks',
        description: 'Visual guide to understanding React Hooks'
      }
    ],
    createdBy: 'system',
    createdAt: '2023-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'SQL Injection',
    slug: 'sql-injection',
    category: 'database',
    shortDescription: 'A code injection technique used to attack data-driven applications',
    simpleExplanation: 'SQL Injection is when an attacker enters SQL code into input fields on a website to manipulate the database, potentially gaining unauthorized access to sensitive data or corrupting the database.',
    technicalExplanation: 'SQL Injection is a type of security vulnerability that occurs when an attacker is able to insert or "inject" malicious SQL code into a query that an application sends to its database. This happens when user input is not properly validated or sanitized before being included in SQL statements. Successful SQL injection attacks can read sensitive data, modify database data, execute administration operations, and in some cases gain complete control of the system.',
    analogy: `Imagine a bank teller who follows instructions literally:

- A normal customer says: "Please show me my account balance"
- An attacker says: "Please show me my account balance; ALSO show me everyone else's account balances"

If the teller doesn't validate the request and blindly follows all instructions, they will inadvertently reveal sensitive information about other customers.

In a similar way, a vulnerable application takes user input (like a username) and directly inserts it into a database query without checking if it contains additional, malicious commands.`,
    codeExample: `// Vulnerable code
let query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

// Attack example (username input)
// admin' --
// This would make the query:
// SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
// The -- comments out the rest of the query, bypassing password check

// Secure code using parameterized queries
let query = "SELECT * FROM users WHERE username = ? AND password = ?";
connection.query(query, [username, password], function(err, results) {
  // Handle results
});`,
    tags: ['security', 'database', 'sql', 'vulnerability', 'injection'],
    resources: [
      {
        title: 'OWASP SQL Injection Prevention Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
        description: 'Comprehensive guide to preventing SQL injection'
      },
      {
        title: 'PortSwigger SQL Injection Tutorial',
        url: 'https://portswigger.net/web-security/sql-injection',
        description: 'Interactive tutorial on understanding and exploiting SQL injection vulnerabilities'
      }
    ],
    createdBy: 'system',
    createdAt: '2023-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Docker',
    slug: 'docker',
    category: 'devops',
    shortDescription: 'A platform for developing, shipping, and running applications in containers',
    simpleExplanation: 'Docker is a tool that lets developers package their applications with all necessary parts (libraries, dependencies, etc.) into standardized units called containers that can run consistently on any environment.',
    technicalExplanation: 'Docker is an open-source platform that automates the deployment of applications inside lightweight, portable containers. Containers are isolated but share the host system\'s OS kernel, making them more efficient than virtual machines. Docker uses a layered filesystem and provides a Docker Hub for sharing and distributing containers. Key components include the Docker Engine (runtime), Dockerfile (build instructions), Images (templates), and Containers (running instances of images).',
    analogy: `Imagine shipping goods across the world:

- Before shipping containers, cargo was handled differently at each port, causing inconsistency and inefficiency
- Shipping containers standardized how goods are packaged and transported

Similarly:

- Traditional deployment: Apps work differently in development vs. production ("it works on my machine" problem)
- Docker containers: Package everything the application needs, ensuring it runs the same way everywhere—development, testing, or production`,
    codeExample: `# Example Dockerfile for a Node.js application
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# Build the image
# docker build -t my-node-app .

# Run the container
# docker run -p 3000:3000 my-node-app`,
    tags: ['docker', 'containers', 'devops', 'deployment', 'virtualization'],
    resources: [
      {
        title: 'Docker Documentation',
        url: 'https://docs.docker.com/',
        description: 'Official Docker documentation'
      },
      {
        title: 'Docker for Beginners',
        url: 'https://docker-curriculum.com/',
        description: 'Comprehensive beginner-friendly Docker tutorial'
      }
    ],
    createdBy: 'system',
    createdAt: '2023-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'WebSockets',
    slug: 'websockets',
    category: 'frontend',
    shortDescription: 'A communication protocol providing full-duplex communication over a single TCP connection',
    simpleExplanation: 'WebSockets allow a web page to maintain a continuous two-way connection with a server, so they can send messages back and forth instantly without having to constantly refresh the page.',
    technicalExplanation: 'WebSocket is a protocol that provides a persistent connection between a client and server over a single TCP socket, allowing for real-time, bidirectional communication. Unlike HTTP, which is stateless and primarily client-initiated, WebSockets remain open after the initial handshake, allowing either the client or server to send data at any time. This makes WebSockets ideal for applications requiring low-latency, real-time updates like chat applications, live notifications, collaborative editing, and online gaming.',
    analogy: `Traditional HTTP requests are like sending letters through the mail:

- You send a request (mail a letter)
- You wait for a response (letter back)
- For new information, you must send another request (mail another letter)

WebSockets, on the other hand, are like a phone call:

- Once the connection is established, both sides can talk whenever they want
- The line stays open until either party hangs up
- There's no need to "redial" for each piece of information
- Both sides can speak at any time without waiting for the other to finish`,
    codeExample: `// Client-side WebSocket example
const socket = new WebSocket('ws://example.com/socket');

// Connection opened
socket.addEventListener('open', (event) => {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('Connection closed');
});

// Server-side example (Node.js with ws package)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send('Got your message: ' + message);
  });

  ws.send('Welcome to the WebSocket server!');
});`,
    tags: ['websockets', 'networking', 'real-time', 'frontend', 'protocol'],
    resources: [
      {
        title: 'MDN WebSocket API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
        description: 'Comprehensive guide to the WebSocket API'
      },
      {
        title: 'WebSockets - A Conceptual Deep Dive',
        url: 'https://ably.com/blog/websockets-conceptual-deep-dive',
        description: 'In-depth explanation of how WebSockets work'
      }
    ],
    createdBy: 'system',
    createdAt: '2023-01-05T00:00:00Z'
  },
];

export default mockTerms;
