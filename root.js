function saveToLocalStorage() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // Create an appointment object
    var obj = {
    name: name,
    email: email,
    phone: phone
    };
    console.log(obj);
    axios.post("https://crudcrud.com/api/1bd3e474a92d4049937167ec1c15bf42/Appointment",obj)
    .then(resolve=>console.log(resolve))
    .catch(err=>{
        console.log(err);
    })
}
function removeUserFromScreen(user) {
    const parentNode=document.getElementById('listOfUsers');
    const childNodeToDeleted=document.getElementById(user);
    if(childNodeToDeleted){
        parentNode.removeChild(childNodeToDeleted);
    }
}
function deleteUser(email,email1){
    console.log(email);
    localStorage.removeItem(email1);
    removeUserFromScreen(email1);
    axios.delete(`https://crudcrud.com/api/1bd3e474a92d4049937167ec1c15bf42/Appointment/${email}`)
    .then(resolve=>console.log(resolve))
    .catch(err=>{
        console.log(err);
    })
    
}
function editUserDetails(_id,name,email,phone){
    console.log(_id,email,name,phone);
    document.getElementById('name').value=name;
    document.getElementById('email').value=email;
    document.getElementById('phone').value=phone;
    deleteUser(_id,email);
}
function showNewUserOnScreen(user){
    // document.getElementById(email).value='';
    // document.getElementById(name).value='';
    // document.getElementById(phone).value='';
    // if(localStorage.getItem(user.email)!==null)
    //     removeUserFromScreen(user.email);
    const parentNode=document.getElementById('listOfUsers');
    console.log(parentNode);
    const childHTML = `<li id=${user.email}>${user.name}- ${user.email}-${user._id}
                            <button onclick=deleteUser('${user._id}','${user.email}')> Delete </button> 
                            <button onclick=editUserDetails('${user._id}','${user.name}','${user.email}','${user.phone}')> Edit </button>
                        </li>`
    parentNode.innerHTML+=childHTML;
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/1bd3e474a92d4049937167ec1c15bf42/Appointment')
      .then((res)=>{
        for(var i=0;i<res.data.length;i++){
            showNewUserOnScreen(res.data[i]);
        }
      })
    .catch(err=>console.log(err))
})

