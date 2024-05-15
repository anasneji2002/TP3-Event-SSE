// eslint-disable-next-line @typescript-eslint/no-var-requires
const EventSource = require('eventsource');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMjIyMjIyIiwiZW1haWwiOiJhZG1pbkBhbmFzLnRuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE1NDI4NDM1LCJleHAiOjE3MTU0MzIwMzV9.AMBzaSntaw16Vnq7ztjkSQZT27CxqQlppRiaOKr18Wg'

function connectToSSE() {
  const eventSource = new EventSource('http://localhost:3000/sse', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  eventSource.onmessage = (event) => {
    console.log('New message:', event);
  };

  eventSource.onerror = (error) => {
    console.error('EventSource error:', error);
    
    
  };
}

// Start the initial connection
connectToSSE();