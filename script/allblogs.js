const currentTime = new Date();
const currentHour = currentTime.getHours();
const time = document.querySelector('#time')

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
const text = document.createTextNode(`${greeting} Raaders!`)
time.appendChild(text)

// time end

