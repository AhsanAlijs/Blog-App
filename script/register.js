import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { auth, db, storage } from './config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'


const form = document.querySelector('#form');
const main = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const retypePassword = document.querySelector('#retype-password');
const uploadPhoto = document.querySelector('#upload-photo')
const loading = document.querySelector('.loading')
const submit = document.querySelector('.submit')


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submit.style.display = 'none'
    loading.style.display = 'block'

    const names = `${main.value} ${lastName.value}`;

    try {
        if (password.value !== retypePassword.value) {
            alert('Passwords do not match');
            return;
        }

        const files = uploadPhoto.files[0];
        const storageRef = ref(storage, email.value);

        try {
            await uploadBytes(storageRef, files);
            const url = await getDownloadURL(storageRef);

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
                const user = userCredential.user;

                try {
                    const res = await addDoc(collection(db, "users"), {
                        names: names,
                        email: email.value,
                        uid: user.uid,
                        profileUrl: url
                    });

                    console.log(res);
                    window.location = 'login.html';
                } catch (addDocError) {
                    console.log(addDocError);
                }

            } catch (createUserError) {
                const errorMessage = createUserError.message;
                console.log(errorMessage);
                modalMessage.innerHTML = errorMessage;
            }

        } catch (uploadError) {
            const errorMessage = uploadError.message;
            console.log(errorMessage);
            modalMessage.innerHTML = errorMessage;
        }

    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
    } finally {
        loading.style.display = 'none'
        submit.style.display = 'block'


    }
});






