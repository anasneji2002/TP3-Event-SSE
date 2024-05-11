const eventSource = new EventSource('/sse');

eventSource.onopen = function(event) {
    console.log('Connected to SSE server');
};

eventSource.onerror = function(error) {
    console.error('Error connecting to SSE server', error);
};

eventSource.addEventListener('message', function(event) {
    console.log('Received SSE message:', event.data);
    // Traitement supplémentaire selon les besoins
});