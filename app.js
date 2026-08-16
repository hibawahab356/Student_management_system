const supabaseUrl = "https://esmpxsoymuhishlrafxc.supabase.co";
const supabaseKey = "sb_publishable_Iijhe3GWogHqTsD01qycmQ_kiyFG60x";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey);

console.log(client);


const form = document.querySelector("#studentRegisteration")

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    const formInfo = new FormData(form)
    const data = Object.fromEntries(formInfo)
    console.log(data);
})