export const fetchApiUtil = (url: string, callback: Function) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        callback(data, false);
      })
      .catch(error => callback(error, true));
};