const APIUrl = "https://bb2912fb-589c-4518-a0be-fd9d5d59cc90.mock.pstmn.io";
const getData = async (method) => {
    
    const result = await fetch(`${APIUrl}/${method}`, [
        {
          method: "GET",
        }
      ])
      .then((response) => response.json())
      .then((data) => {
        return data;
      }
      ).catch((error) => {
        return error;
      });
      return result
}

export default getData;