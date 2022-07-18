export const BASE_URL = `https://strangers-things.herokuapp.com/api/2204-FTB-MT-WEB-PT`

export const callApi = async (url, method, token, body) => {
  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
      }
      if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(BASE_URL + url, options)
    const data = await response.json();
      if (data.error) {
      throw (data.error)
      }
      return data
    }
      catch (error) {
        console.error(error)
    }
  }

export const registerUser = async (username, password) => {
  const registered = await callApi("/users/register", "POST", null, {
    user: { username, password }
  })

  return {
    user: registered.data.message,
    token: registered.data.token
    }
  }

export const loginUser = async (username, password) => {
  const login = await callApi("/users/login", "POST", null, {
    user: { username, password }
  })

  return {
    user: login.data.message,
    token: login.data.token
    }
  }

export const addMessage = async (token, content, post_Id) => {
  const data = await callApi(`/posts/${post_Id}/messages`, "POST", token, {
    message: { content }
  })

  return data
  }

export const submitPost = async (token, title, description, price, location, willDeliver) => {
  const data = await callApi(
    `/posts/`,
    "POST",
    token,
    { post: { title, description, price, location, willDeliver } })

  return data.data.post
  }

export const deletePost = async (token, post_Id) => {
  const data = await callApi(
    `/posts/${post_Id}`,
    "DELETE",
    token)

  return data
  }

export const getUser = async (token) => {
  const data = await callApi(`/users/me`, "GET", token)
  return data
  }

export const getPost = async (token) => {
  const response = await callApi('/posts', 'GET', token)
  return response
  }




