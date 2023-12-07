import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, getDocs, where,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';

const data = document.querySelector('#data')

let uid;
let docID;

onAuthStateChanged(auth, async (user) => {
    if (!user) {

        return
    }
    uid = user.uid
})


const spasificBlogsArry = [];




const postsQuerySnapshot = await getDocs(collection(db, "spasificUser"), where('uid', '==', uid));
postsQuerySnapshot.forEach((doc) => {
    spasificBlogsArry.push({ ...doc.data(), docId: doc.id });
    docID = doc.id
});

spasificBlogsArry.map((item) => {
    console.log(item);
    const time = item.spasificUser.time.seconds
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
    data.innerHTML = `
<div class="flex items-center justify-between flex-wrap ">
                    <div class="main-blog w-[69%] bg-[#ffff] p-[40px] shadow-2xl rounded-2xl mt-[20px]">
                        <!-- blog title start -->
                        <div class="blog-title flex items-center gap-[15px]">
                            <div class="">
                                <img src="${item.spasificUser.userArr.profileUrl}" class="object-cover object-center w-[90px] h-[90px]  rounded-[15px]"
                                    id="blog-img">
                            </div>

                            <div class="title-text  ">
                                <p class="text-[24px] font-bold leading-[1.5] text-[#000] w-[55%]">${item.spasificUser.title}</p>
                                <p class="w-[35%] text-[16px] font-semibold text-[#6C757D]"><span>${item.spasificUser.userArr.names}</span> -
                                    <span>${formattedDate}</span>
                                </p>
                            </div>
                        </div>
                        <!-- blog title end -->

                        <!-- Blog-description-start -->
                        <div class="blog-description mt-[20px]">
                            <!-- blog div start  -->
                            <div class="description w-[100%]  text-[16px] leading-[2] text-[#6C757D]">
                                <p>
                                    ${item.spasificUser.description}
                                </P>
                                
                            </div>
                            <!-- blog div End -->

                        </div>
                    </div>


                   
                    <div class=" text-end p-[20px] absolute  right-0 top-[200px]">
                        <div class="email ">
                            <p class="text-[#000] text-[20px] font-[600]">${item.spasificUser.userArr.email}</p>
                        </div>
                        <div class="name ">
                            <p class="text-[#7749F8] text-[40px] font-[700]">${item.spasificUser.userArr.names}</p>
                        </div>
                        <div class="img">
                            <img src="${item.spasificUser.userArr.profileUrl}"
                                alt="" class="w-[300px] rounded-[12px]">
                        </div>

                    </div>
                </div>

`


})