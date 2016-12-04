export function handleAuth() {
  const currUrl = window.location;
  const token = localStorage.getItem('@TOKEN');
  if(!token) {
    console.log('in handleAuth function')
    window.location.href = `${currUrl}login`;
  }
}

export function handleUnauth() {
  const token = localStorage.getItem('@TOKEN');
  if(token) {
    window.location.href = 'http://localhost:8888/reservation-client';
  }
}
