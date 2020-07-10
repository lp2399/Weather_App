 const weather = new WEATHER,
 createContent = new CREATE_CONTENT;
document.addEventListener('DOMContentLoaded', initializeApp);
function initializeApp(){
  getTime();
  window.setInterval(()=>{
    getTime();
  },1000);
  getDay();
  dragWeatherItems();
  select();
}
let modal = document.querySelector('.modal-container')
,container = document.querySelector('.container');
document.querySelector('#change-location').addEventListener('click',()=>{
  modal.style.display = 'block';
  container.style.display = 'none';
  document.querySelector('#close-button').addEventListener('click',()=>{
  modal.style.display = 'none';
  container.style.display = 'block';
});
});
function select(){
  document.querySelector('#select').addEventListener('click',()=>{
  const city = document.querySelector('#input-city').value,
  state = document.querySelector('#input-state').value;
  weather.changeLocation(city,state);
  getWeather(city,state);
  });
}
function getWeather(city,state){
  weather.getWeather(city,state)
       .then(results =>  {
       if(results.cod==401){
        alert(`ERROR 401 (Unauthorized): ${results.message}`);
      } 
       else if(results.cod==404){
        weather.locationNotFound();
       }else{
         createContent.create(results);
         modal.style.display = 'none';
         container.style.display = 'block';
       }
       })
       .catch(err => {
       console.log(`ERROR : ${err}`);
       });
}
 function getTime(){
//from https://stackoverflow.com/questions/18536726/javascript-to-display-the-current-date-and-time/18536804
  const date = new Date();
  let hour = date.getHours(),
  minutes = date.getMinutes(),
  newformat = hour >= 12 ? 'PM' : 'AM';  
  hour = hour % 12;  
  hour = hour ? hour : 12;  
  minutes = minutes < 10 ? '0' + minutes : minutes;
  document.querySelector('#time').innerHTML =  `${hour}:${minutes} ${newformat}`;
}
function getDay(){
  const date = new Date();
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let today = weekday[date.getDay()];
  document.querySelector('#day').innerHTML =  today;
}
function dragWeatherItems(){
  //for the most part it works however their is a bug that when you try to drag an item to the end it gets stuck on top on of another item any fixes would be apreiciated
  // functionality from Stack Overflow https://stackoverflow.com/questions/10588607/tutorial-for-html5-dragdrop-sortable-list
let selected = null
let weatherItem = document.querySelectorAll('.weather-item');
for(let i = 0; i<weatherItem.length;i++){
weatherItem[i].addEventListener('dragover',(e)=>{
  e.preventDefault();
if (isBefore(selected, e.target)) {
  e.target.parentNode.insertBefore(selected, e.target);
} else {
  e.target.parentNode.insertBefore(selected, e.target.nextSibling);
}if(e.target.parentNode.isSameNode(e.target.lastChild)){return}
})
weatherItem[i].addEventListener('dragstart',(e)=>{
e.dataTransfer.effectAllowed = 'move'
e.dataTransfer.setData('text/plain', null);
selected = e.target;
})
weatherItem[i].addEventListener('dragend',(e)=>{
selected = null;
});
};
function isBefore(el1, el2) {
let current;
if (el2.parentNode === el1.parentNode) {
  for (current = el1.previousSibling; current; current = current.previousSibling) {
    if (current === el2) return true;
  }
}
return false;
}
};
