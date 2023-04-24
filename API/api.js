//funcion que realiza la peticion a las APIs
const fetchData = async (urlAPI) => {
  try {
    const data = await fetch(urlAPI);
    const result = await data.json();
    return result;
} catch (error) {
    console.log(error);
}
  };

  export default {
    fetchData
};