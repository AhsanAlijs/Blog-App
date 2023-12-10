import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs, where, query, orderBy, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';

const currentTime = new Date();
const currentHour = currentTime.getHours();
const time = document.querySelector('#time');
const allBlogContent = document.querySelector('#allBlogContent')


let uid;
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        return
    }
    uid = user.uid
})













// time start
let greeting;
if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning'
} else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon'
} else if (currentHour >= 17 && currentHour < 21) {
    greeting = 'Good Evening';
} else {
    greeting = 'Good Night';
}
// console.log(greeting);
const text = document.createTextNode(`${greeting} Readers!`)
time.appendChild(text)

// time end



const allBlogsArry = [];



const postsQuerySnapshot = await getDocs(collection(db, "posts"), where('uid', '==', uid));
postsQuerySnapshot.forEach((doc) => {
    allBlogsArry.push({ ...doc.data(), docId: doc.id });
});

// console.log(allBlogsArry);


// const usersQuerySnapshot = await getDocs(collection(db, "users"), where('docId', '==', docsID));
// usersQuerySnapshot.forEach((user) => {
//     // console.log(user.data());
//     userData.push({ ...user.data(), docId: user.docId })

//     console.log(user.data());
// });
// // console.log(allBlogsArry);


// let userName;
// let profileImage;


// userData.map((user) => {
//     userName = user.names
//     profileImage = user.profileUrl
//     console.log();
// })




allBlogsArry.map(async (item) => {
    // console.log(item);
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
    allBlogContent.innerHTML += `

    
    <div class="main-blog w-[70%] bg-[#ffff] p-[40px] shadow-2xl rounded-2xl mt-[20px] ">
                    <!-- blog title start -->
                    <div class="allimg">
                        <div class="">
                            <img src="${item.userArr.profileUrl}" class="object-cover object-center w-[90px] h-[90px]  rounded-[15px]" id="allblogimg">
                        </div>
                        
    
                        <div class="title-text  ">
                        <p class="text-[24px] font-bold leading-[1.5] text-[#000] w-[%]">${item.title}</p>
                        <p class="w-[] text-[16px] font-semibold text-[#6C757D]">${item.userArr.names}<span></span> - <span>${formattedDate}</span>
                        </p>
                    </div>
                    </div>
                <!-- Blog-description-start -->
                <div class="blog-description mt-[20px]">
                    <!-- blog div start  -->
                    <div class="description w-[100%]  text-[16px] leading-[2] text-[#6C757D]">
                        <p>
                           ${item.description}
                        </P>
                    </div>
                    <!-- blog div End -->
                    <div class="blog-btn flex items-center gap-[20px] mt-[5px] text-[#787afc]">
                        <div class="edit text-[#787afc] cursor-pointer">
                            <a  href="./spacificuser.html" class="text-[#787afc] text-lg font-medium "  id="newpage" >see all from this user</a>
                        </div>
                       
                    </div>
                </div>
    `
})












