const RegisterData = (data) => {
  var users = JSON.parse(localStorage.getItem("registration") || "[]");

  const newData = {
    id: users.length + 1,
    username: data.username,
    email: data.email,
    password: data.password,
  };

  users.push(newData);
  localStorage.setItem("registration", JSON.stringify(users));
};

const LoginData = (loginData) => { 
  let result = localStorage.getItem("registration");
  let res = JSON.parse(result);

  const data = res.find((ele) => ele.email === loginData.email);

  if (!data) {
    alert("Did not find Email");
  } else {
    if (data.password === loginData.password) {
      localStorage.setItem("login", JSON.stringify(loginData));
    } else {
      alert("please enter correct password");
    }
  }
};
const AddPost = (details) => {
  var data = JSON.parse(localStorage.getItem("post") || "[]");
  const idAdd={
    id:data.length+1,
    userId:details.userId,
    title:details.title,
    post:details.post,
    isDeleted:false
  }
  data.push(idAdd);
  localStorage.setItem("post", JSON.stringify(data));
};

export default { RegisterData, LoginData, AddPost };
