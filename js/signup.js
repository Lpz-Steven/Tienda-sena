
const d = document
const signupform = document.querySelector('#signupForm')

signupform.addEventListener("submit", (e)=>{
        e.preventDefault()
        const name=d.querySelector("#name").value
        const email=d.querySelector("#email").value
        const password=d.querySelector("#password").value

        const Users = JSON.parse(localStorage.getItem('users')) || []

        
        const isUserRegistered = Users.find(user => user.email === email)
        if(isUserRegistered){
            return 
        }

        Users.push({name:name, email:email, password:password})
        localStorage.setItem('users', JSON.stringify(Users))
        window.location.href ='login.html'

        //redireccion a login

})