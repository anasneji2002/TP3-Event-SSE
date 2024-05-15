// eslint-disable-next-line @typescript-eslint/no-var-requires
const EventSource = require('eventsource');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXI3NzciLCJlbWFpbCI6InVzZXI3N0BhbmFzLnRuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTU0MzA1NDIsImV4cCI6MTcxNTQzNDE0Mn0.gMWEp-mqVbNBUe55p268Ez1nPEhs3LXfW3frU_QvyhA'

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