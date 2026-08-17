const supabaseUrl = "https://esmpxsoymuhishlrafxc.supabase.co";
const supabaseKey = "sb_publishable_Iijhe3GWogHqTsD01qycmQ_kiyFG60x";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey);

console.log(client);


const form = document.querySelector("#studentRegisteration")

form.addEventListener("submit",async(event)=>{
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