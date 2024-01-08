export const getaccessToken=()=>{
    return sessionStorage.getItem('accestoken');
}


export const getType = (value, body) => {
    if (value.params) {
        return { params: body }
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id }
        } else {
            return { query: body }
        }
    }
    return {};
}

const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  export const checkCredentials = async (credentials, isSignup = true) => {
    let { username, email, password } = credentials;
    username = username.trim();
    password = password.trim();
  
    if (isSignup) {
      email = email.trim();
      if (!email || !username || !password) {
        return { msg: "Please fill all the details.", isError: true };
      } else if (!isEmailValid(email)) {
        return { msg: "Invalid email format", isError: true };
      }
    } else {
      if (!username || !password) {
        return { msg: "Please fill all the details.", isError: true };
      }
    }

    if (username.length < 6) {
      return { msg: "Username must be at least 6 characters", isError: true };
    } else if (password.length < 6) {
      return { msg: "Password must be at least 6 characters", isError: true };
    } else {
      return { msg: "All checked", isError: false };
    }
  };
  

  export const PostValidation = async(post)=>{
    let { title, description } = post;
    title = title.trim();
    description = description.trim();
    if(title.length<10){
      return { msg: "Title is too Short", isError: true };
    }else if(description.length<50){
      return { msg: "Content is too Short", isError: true };
    }else{
      return { msg: "success", isError: false };
    }
  }