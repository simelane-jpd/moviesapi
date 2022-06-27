import axios from "axios";

export function Login() {
  const URL_BASE = import.meta.env.VITE_SERVER_URL;
  return {
    firstname:'',
    lastname:'',
    username: '',
    password: '',
    //heartsCount: '',
    loginUsername: '',
    loginPassword: '',
    loginInput: true,
    logoutBtn: false,
    registerInput: false,
    mainContent: false,
    errorMessage: false,
    successMessage: false,
   // init() {
        //if (localStorage.getItem('token') && localStorage.getItem('username')) {
          //this.registerInput = false
          //this.loginInput = false
          //this.mainContent = true
          //this.logoutBtn = true
          //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
          //const username = localStorage.getItem('username')
          //axios
          //  .get(`${URL_BASE}/users/login/${username}`, { withCredentials: true, })
           // .then((result) => {
           //   this.heartsCount = result.data.data
           // });
          
  
       // },
      
      logout() {
        localStorage.clear()
        location.reload()
        this.logoutBtn = false
        this.registerInput = false
        this.loginInput = true
        this.mainContent = false
        this.loginUsername = ''
        this.loginPassword = ''
      },
      hideLogin() {
        this.loginInput = false
        this.registerInput = true
      },
      hideRegister() {
        this.loginInput = true
        this.registerInput = false
      },
      register() {
        if (this.username !== '') {
          axios
            .post(`${URL_BASE}/users/register`, { firstname: this.firstname, lastname: this.lastname, username: this.username, password: this.password })
            .then((result) => {
              if (result.data.message == 'success') {
                this.successMessage = true,
                  this.$refs.successMessage.innerText = 'registration successful'
                this.loginInput = true
                this.registerInput = false
  
              } else {
                this.errorMessage = true,
                  this.$refs.errorMessage.innerText = 'this username has already been registered'
              }
  
  
            });
  
        }
        setTimeout(() => { this.errorMessage = false }, 2000);
        setTimeout(() => { this.successMessage = false }, 2000);
  this.firstname = ''
  this.lastname=''
        this.username = ''
        this.password = ''
        this.loginUsername = ''
        this.loginPassword = ''
      },
      login() {
        this.user = localStorage.getItem('username')
       // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios
          .post(`${URL_BASE}/users/login`, { username: this.loginUsername, password: this.loginPassword })
          .then((result) => {
            if (result.data.message == 'unregistered') {
              this.errorMessage = true,
                this.$refs.errorMessage.innerText = 'this username has not been registered'
              this.loginUsername = ''
              this.loginPassword = ''
            } else if (result.data.message == 'unmatched') {
              this.errorMessage = true,
                this.$refs.errorMessage.innerText = 'incorrect username or password'
              this.loginUsername = ''
              this.loginPassword = ''
            } else {
              localStorage.setItem('username', this.loginUsername);
             // const { token } = result.data;
             // localStorage.setItem('token', token);
             // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  
              const results = result.data
              if (results.message == 'success') {
                this.mainContent = true
                this.registerInput = false
                this.loginInput = false
                this.logoutBtn = true
                location.reload()
  
                //axios
                  //.get(`${URL_BASE}/api/hearts/${this.loginUsername}`)
                 // .then((result) => {
                 //   this.heartsCount = result.data.data
                //  });
                this.successMessage = true,
                  this.$refs.successMessage.innerText = 'login successful'
              }
            }
  
          });        
  
        setTimeout(() => { this.errorMessage = false }, 2000);
        setTimeout(() => { this.successMessage = false }, 2000);
      }
      ,
    }
}
