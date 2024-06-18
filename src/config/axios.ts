import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-audie.playlistsolutions.com',
  headers: {
    'X-StationId': 'f8dd520c-f689-4f56-bc38-be810dea0fbb',
    'x-type': 'cellphone',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export {api};
