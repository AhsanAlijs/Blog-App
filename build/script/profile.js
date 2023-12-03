import { signOut, onAuthStateChanged, updatePassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, getDocs, where, query, updateDoc, doc, } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';




const logout = document.querySelector('#logout');
const navImg = document.querySelector('#nav-img');
const username = document.querySelector('#username');
const profileImg = document.querySelector('#profileImg');

const userProfileArr = [];
function userRender() {
  userProfileArr.map((item) => {
    username.innerHTML = `${item.names} <i class="fa-solid fa-pen" style="color: #7749f8"></i>`
    navImg.src = `${item.profileUrl}`
    profileImg.src = `${item.profileUrl}`
  })

}
// console.log(userProfileArr);


onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location = "./login.html"
    return
  }
  let uid = user.uid
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc,) => {
    userProfileArr.push({ ...doc.data() })
  });
  userRender()
  // console.log(userProfileArr);
});




logout.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location = './login.html'
  }).catch((error) => {
    console.log(error);
  });
})




const updateForm = document.querySelector("#form")
const updateName = document.querySelector('#name')
const pass = document.querySelector('#oldpassword')
const newPassword = document.querySelector('#newpassword')
const repeatPassword = document.querySelector('#repeatpassword')




updateForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  async function updateUserName() {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        names: updateName.value,
      });
    });
  }
  updateUserName()

  const user = auth.currentUser;



  if (repeatPassword.value !== newPassword.value) {
    Swal.fire({
      title: "Password are not same",
      showClass: {
        popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
      },
      hideClass: {
        popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
      }
    });
    return
  }


  updatePassword(user, newPassword.value)
    .then(() => {
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
        icon: "success",
        title: "Change User Name or Password successfully"
      });
    }).catch((error) => {
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
        icon: "info",
        title: "User Name or Password are not changed successfully"
      });
    });
})





