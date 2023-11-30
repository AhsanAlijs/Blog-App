import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs, where, query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';


const imageNav = document.querySelector("#image-nav");
const idName = document.querySelector('#id-name');
const blogImg = document.querySelector("#blog-img")




onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location = 'allblogs.html'
        return
    }
    let uid = user.uid
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        idName.innerHTML = doc.data().name
        imageNav.src = doc.data().profileUrl
        blogImg.src = doc.data().profileUrl
    });
});

const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'login.html'
    }).catch((error) => {
        console.log(error);
    });
})

