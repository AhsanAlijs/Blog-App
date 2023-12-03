import { signOut, onAuthStateChanged, updateProfile  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, getDocs, where, query,  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';




const logout = document.querySelector('#logout');
const navImg = document.querySelector('#nav-img');
const username = document.querySelector('#username');
const profileImg = document.querySelector('#profileImg');


onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location="./login.html"
        return
    }
    let uid = user.uid
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        username.innerHTML = `${doc.data().name} <i class="fa-solid fa-pen" style="color: #7749f8"></i>`
        navImg.src = doc.data().profileUrl
        profileImg.src=`${doc.data().profileUrl}`
        // img = doc.data().profileUrl
    });
    
});




logout.addEventListener("click" , ()=>{
    signOut(auth).then(() => {
        window.location='./login.html'
      }).catch((error) => {
       console.log(error);
      });
})


const updateForm = document.querySelector("#form")
const updateName = document.querySelector('#name')
const pass = document.querySelector('#oldpassword')
const newPassword = document.querySelector('#newpassword')
const repeatPassword = document.querySelector('#repeatpassword')

updateForm.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const docRef = collection(db, "users")
  

    console.log(docRef.updateProfile());


})





