const isStorageAvailable = function() {
  try {
    localStorage.setItem('key', 'value');
    const isAvailable = localStorage.getItem('key') === 'value';
    localStorage.removeItem('key');
    return isAvailable;
  } catch (err) {
    console.error('LocalStorage is not available -> ' + err.message);
    return false;
  }
};

export default isStorageAvailable;
