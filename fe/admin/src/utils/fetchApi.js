export const getData = async (api, options = {}) => {
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred: ", err);
    throw err;
  }
};

export const postData = async (api, form, opitons = {}) => {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(form),

      ...opitons,
    });

    if (!response.ok) {
      // throw new Error(`Request failed with status ${response.status}`);
      console.log(response);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred: ", err);
    throw err;
  }
};
export const putData = async (api, form, opitons = {}) => {
  try {
    const response = await fetch(api, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(form),

      ...opitons,
    });

    if (!response.ok) {
      // throw new Error(`Request failed with status ${response.status}`);
      console.log(response);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred: ", err);
    throw err;
  }
};

export const deleteData = async (api, opitons = {}) => {
  try {
    const response = await fetch(api, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },

      ...opitons,
    });

    if (!response.ok) {
      console.log(response);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred: ", err);
    throw err;
  }
};
