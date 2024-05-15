// eslint-disable-next-line @typescript-eslint/no-var-requires
const EventSource = require('eventsource');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIgNSIsImVtYWlsIjoidXNlcjVAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTU0MzE2MjEsImV4cCI6MTcxNTQzNTIyMX0.S_usoaujhMg1Gxj_b0iDP3R5J5o9BUnLYZ2VuDUe3NI"

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