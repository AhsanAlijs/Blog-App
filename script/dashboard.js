import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs, where, query, orderBy, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';


const imageNav = document.querySelector("#image-nav");
const idName = document.querySelector('#id-name');
const blogImg = document.querySelector("#blog-img");
const blogform = document.querySelector('#blogform');
const title = document.querySelector('#title')
const description = document.querySelector('#description');
const blogcontainor = document.querySelector('#blogcontainor')
const dome = document.querySelector('.dome')

let uid;

let userData;
// const q = query(collection(db, "users"),);
// const querySnapshot = await getDocs(q);

// querySnapshot.forEach((doc) => {
//     userData = doc.data()


// });
// // console.log(userData);










let img;
let logname;


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
    title: `Login Successfully`
  });




onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location = 'index.html'
        return
    }
    uid = user.uid
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        userData = doc.data()
        // console.log(doc.data());
        idName.innerHTML = doc.data().names
        imageNav.src = doc.data().profileUrl
        img = doc.data().profileUrl
        logname = doc.data().names
    });
    getdataformfirestore(uid)
    // renderPost(img)
});



const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'index.html'
    }).catch((error) => {
        console.log(error);
    });
})

let postsArr = [];


function renderPost() {
    blogcontainor.innerHTML = ''
    postsArr.map((item) => {

        // console.log(item.userArr.profileUrl);
        const time = item.time.seconds
        const mydate = new Date(time * 1000)
        const stringdate = mydate.toLocaleString()
        const parts = stringdate.split('/')
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        // Create a Date object
        const myDate = new Date(year, month - 1, day);
        // Format the date as "Dec 2nd, 2023"
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = myDate.toLocaleDateString('en-US', options);
        // console.log(formattedDate);
        // console.log(mydate)
        blogcontainor.innerHTML += `
        <div class="main-blog w-[70%] bg-[#ffff] p-[40px] shadow-2xl rounded-2xl mt-[20px]" >
                <!-- blog title start -->
                <div class="allimg">
                    <div class="">
                        <img src="${img}" class="object-cover object-center w-[90px] h-[90px]  rounded-[15px]" id="blog-img">
                        
                    </div>

                    <div class="title-text  ">
                        <p class="text-[24px] font-bold leading-[1.5] text-[#000] w-[%]">${item.title}</p>
                        <p class="w-[] text-[16px] font-semibold text-[#6C757D]"><span>${logname}</span> - <span>${formattedDate}</span>
                        </p>
                    </div>
                </div>
                <!-- blog title end -->

                <!-- Blog-description-start -->
                <div class="blog-description mt-[20px]">
                    <!-- blog div start  -->
                    <div class="description w-[100%]  text-[16px] leading-[2] text-[#6C757D]">
                        <p id="descriptionEdit">
                           ${item.description}
                        </P>
                    </div>
                    <!-- blog div End -->
                    <div class="blog-btn">
                        <div class="edit">
                            <button class="text-[#7779F8] text-lg font-medium" id="update"><i class="fa-solid fa-file-pen"></i></button>
                        </div>
                        <div class="delete">
                            <button class="text-[#7779F8] text-lg font-medium" id="delete"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>
        `
        // console.log(item);
    });
    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');
    const modal = document.querySelector('.modal')


    del.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log("Delete Called", postsArr[index]);
            await deleteDoc(doc(db, "posts", postsArr[index].docId))
                .then(() => {
                    console.log('post deleted');
                    postsArr.splice(index, 1);
                    renderPost()
                });

        })
    })
    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log("Edit Called", postsArr[index]);
            const updatedTitle = prompt('Update the dox', postsArr[index].title)
            const updateDescription = prompt('Update The Description', postsArr[index].description)
            await updateDoc(doc(db, "posts", postsArr[index].docId), {
                title: updatedTitle,
                description: updateDescription,
                time: Timestamp.fromDate(new Date())
            });
            postsArr[index].title = updatedTitle;
            postsArr[index].description = updateDescription
            renderPost()
        })
    })

}








// get data fire store Start
async function getdataformfirestore(uid) {
    postsArr.length = 0;
    const q = await query(collection(db, "posts"), orderBy("time", "desc"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        postsArr.push({ ...doc.data(), docId: doc.id })
    });
    renderPost()
}

getdataformfirestore()
// get data fire store End













const loading = document.querySelector('.loading')


blogform.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.style.display='block'
    try {
        const postObj = {

            title: title.value,
            description: description.value,
            uid: auth.currentUser.uid,
            time: Timestamp.fromDate(new Date()),
            userArr: userData

        }
        const docRef = await addDoc(collection(db, "posts"), postObj,);
        console.log("Document written with ID: ", docRef.id);
        postObj.docId = docRef.id
        postsArr = [postObj, ...postsArr];
        // console.log(postsArr);
        title.value = ''
        description.value = ''
        renderPost()
    } catch (e) {
        console.error("Error adding document: ", e);
    }finally{
        loading.style.display='none'
    }
})
// console.log(postsArr);

