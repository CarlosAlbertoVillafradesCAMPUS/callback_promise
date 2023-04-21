const fetchData = async (urlAPI, options) => {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
  
    return data;
  };

  export default {
    fetchData
};