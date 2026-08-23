const supabaseUrl = "https://esmpxsoymuhishlrafxc.supabase.co";
const supabaseKey = "sb_publishable_Iijhe3GWogHqTsD01qycmQ_kiyFG60x";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey);

console.log(client);


// signup

const form = document.querySelector("#studentRegistration")

form && form.addEventListener("submit",async(event)=>{
try{
        event.preventDefault()
    const formInfo = new FormData(form)

   let emptyField = false 

let inputs = document.querySelectorAll("input")


inputs.forEach((input)=>{
    if(input.value === ""){
        input.style.border = "2px solid red"
        emptyField = true
    }
})

if(emptyField){
    return
}


    const data = Object.fromEntries(formInfo)
    const {email,password,
firstName,lastName
,fatherName,address,city,course,gender,dob} = data
console.log(firstName,lastName,course,city,dob,fatherName,address,gender);


    const { data:signUpData, error } = await client.auth.signUp({
  email,
  password,
})

const id = signUpData?.user?.id
console.log(id);

// database insertion

const { error:databaseError } = await client
  .from('students_data')
  .insert({firstName,
    lastName,
"father'sName": fatherName,
address,
city,
course,
gender,
dob,
user_id : id,
  })

console.log(databaseError);

window.location.href = "./login.html";
if(signUpData){
    console.log(signUpData);
    
}else{
    console.log(error.message);
    
}

}

catch(error){
    console.log(error);
    
}
})


let inputs = document.querySelectorAll("input")

inputs.forEach((input)=>{
    input.addEventListener("input",()=>{
 if(input.value !== ""){
        input.style.border = ""
        
    }
    })
   
})


// signup end



// login start
let loginBtn = document.querySelector("#loginBtn");
let loginPass = document.querySelector("#loginPassword");
let loginEmail = document.querySelector("#loginEmail");

loginBtn && loginBtn.addEventListener("click", async (event) => {

    event.preventDefault();

    if (!loginEmail.value || !loginPass.value) {
        alert("Please enter email and password");
        return;
    }

    try {

        const { data, error } = await client.auth.signInWithPassword({
            email: loginEmail.value,
            password: loginPass.value
        });

        if (error) {
            console.log(error);
            alert(error.message);
            return;
        }

        console.log("Login user:", data.user);

        alert("Login successful");

        window.location.href = "./home.html";

    } catch (error) {
        console.log(error);
    }

});
// let  loginBtn = document.querySelector("#loginBtn")
// let  loginPass = document.querySelector("#loginPassword")
// let  loginEmail = document.querySelector("#loginEmail")


// console.log(loginBtn)

// loginBtn && loginBtn.addEventListener("click",async(event)=>{
//     event.preventDefault()
 
// if(!loginEmail.value || !loginPass.value){
//     alert("no data")
//     return
// }


// try{
//     const { data, error } = await client.auth.signInWithPassword({
//   email: loginEmail.value,
//   password:loginPass.value,
// })

// const userData = data.user



// console.log(userData);


// if(userData){
//     alert("good")
// }
// window.location.href = "/home.html"
// console.log(error.message);




// switch(error.message){
//     case "Inavlid Login credintials":
//     alert("Inavlid Login credintials")
// }



// }catch(error){
//     console.log(error);
// }
    






// })







if(window.location.pathname.includes ("/home.html")){
    
  const getUser = async()=>{
      const { data: { user } } = await client.auth.getUser()
    // console.log(user.email);

    let showUser = document.querySelector("#user")
    console.log(showUser);
    
    showUser.innerHTML = user?.email || "xyz"


  }
    
    getUser()
}


let logoutBtn = document.querySelector("#logoutBtn")
console.log(logoutBtn);

logoutBtn && logoutBtn.addEventListener("click",async()=>{
    // event.preventDefault()
    console.log("hi");
    
    event.preventDefault()
const { error } = await client.auth.signOut()
console.log(error);
// window.location.href = "login.html";


})
