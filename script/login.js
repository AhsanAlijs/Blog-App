import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btn = document.querySelector('.submit')
const loading = document.querySelector(".loading")

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location = 'dashboard.html'
        return
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    btn.style.display = 'none';
    loading.style.display = 'block';
    // Assuming signInWithEmailAndPassword is an asynchronous function that returns a promise
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log(user);
        window.location.href = 'dashboard.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: `${errorMessage}`
          });
        // If you have a button with the id 'btn', you can display it after an error

    } finally {
        btn.style.display = 'block';
        loading.style.display = 'none';
    }
});
