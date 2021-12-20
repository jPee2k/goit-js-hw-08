const isStorageAvailable = function() {
  try {
    localStorage.setItem('key', 'value');
    return localStorage.getItem('key') === 'value';
  } catch (err) {
    console.error('LocalStorage is not available -> ' + err.message);
    return false;
  }
};

export default isStorageAvailable;
