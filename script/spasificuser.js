import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, getDocs, where, deleteDoc, doc, query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';

const blogs = document.querySelector('.blogs')
let uid = localStorage.getItem("userId")
let userId = JSON.parse(uid)
console.log(userId);
let email = document.querySelector('.email');
let names = document.querySelector('.name');
let image = document.querySelector('.img')
let userData = [];


// get data 

const q = await query(collection(db, "posts"), where("uid", "==", userId));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    userData.push({ ...doc.data(), docId: doc.id })
});

userData.map((item) => {
    console.log(item);
    email.innerHTML=`${item.userArr.email}`
    names.innerHTML=`${item.userArr.names}`
    image.src=`${item.userArr.profileUrl}`
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
    blogs.innerHTML += `


<div class="bg-[#ffffff] rounded-xl p-[30px] w-[500px] ">
                    <div class="main-blog w-[auto] text-justify">
                        <div class="flex items-center gap-[20px] mb-[10px]">
                            <div class="image">
                                <img src="${item.userArr.profileUrl}"
                                    class="object-fill w-[120px] h-[120px] rounded-lg" alt="">
                            </div>
                            <div class="title text-[#000]">
                                <h3 class="text-xl font-extrabold">${item.title}</h3>
                                <div class="namedate text-lg font-semibold">
                                    <span>${item.userArr.names}</span>_<span>${formattedDate}</span>
                                </div>
                            </div>
                        </div>

                        <P class="text-[#000] w-[] text-justify">
                            ${item.description}
                        </P>
                    </div>
                </div>



`
})





