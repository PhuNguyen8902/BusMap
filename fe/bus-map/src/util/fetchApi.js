import authService from "../service/authService";


export const getData = async (api, options = {}) =>{
    try{
        const response = await fetch(api, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
            ...options
        });
    
        if(!response.ok){
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        // console.log("The fetch data: ", data); 
        
        return data;

    }catch(err){
        console.error("An error occurred: ", err)
        throw err;
    }

} 

export const postData = async (api, form, opitons = {}) =>{   
    try{
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(form), 
            ...opitons
        })
        
        if(!response.ok){
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json();
        return data;

    }catch(err){
        console.error("An error occurred: ", err);
        throw err;
    }
}

// Put
export const putData = async (api, form, opitons = {}) =>{   
  try{
      const response = await fetch(api, {
          method: "PUT",
          headers: {
              "Content-Type": "Application/json",
          },
          body: JSON.stringify(form), 
          ...opitons
      })
      
      if(!response.ok){
          throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json();
      return data;

  }catch(err){
      console.error("An error occurred: ", err);
      throw err;
  }
}

//Token
export const getDataToken = async (api, options = {}) => {
    const token = JSON.parse(localStorage.getItem("token"));
  
    // return 403 if dont have token
    if (!token)
      return {
        status: 403,
        error: "Forbiden",
      };
      

    let response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //
        Authorization: `Bearer ${token.accessToken}`,
      },
      ...options,
    });
  
    if (response.status != 200) {
      response = await authService.refreshToken({
        token: token.refreshToken,
      });
      if (!response.mess) {
        token.accessToken = response.accessToken;
        localStorage.setItem("token", JSON.stringify(token));
        return getDataToken(`http://localhost:8080/api/auth/access-token`);
      }
    }
  
    return response.json();
  };