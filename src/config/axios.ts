import axios from 'axios';

const api = axios.create({
  baseURL: 'https://audieappapi.playlistsolutions.com/',
  headers: { 'X-Api-Key': 'AU-cklLn7pGtlW32HNcaI6x1VqNjW4UT' },
});

export { api };
