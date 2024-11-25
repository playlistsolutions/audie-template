import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5933-186-235-79-149.ngrok-free.app/',
  headers: { 'X-Api-Key': 'AU-s3uPnNqt5X1A5v0xkof6hV85dgGhS' },
});

export { api };
