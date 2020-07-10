  class WEATHER  { 
    constructor(city,state){
      this.apiKey =' Get your API key at https://openweathermap.org/api';
      this.city = city;
      this.state = state;
    }
    async getWeather(){
      // almost certain the api doc said city and state however for some reason that doesnt work it only works with city then country
      // api call for ref api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&units=imperial&appid=${this.apiKey}`);
      const responseData = await response.json();
      return responseData;
    }
    changeLocation(city,state){
      this.city = city;
      this.state = state;
    }
   locationNotFound(){
      const message = document.querySelector('.message');
      message.classList.remove('initial');
      setTimeout(()=>{
        message.classList.add('initial');
      },3000)
    }
  }
  class CREATE_CONTENT{
    constructor(){
        this.description = document.querySelector('#description');  
        this.icon = document.querySelector('#icon');
        this.temp =  document.getElementById('temp');
        this.feels_like =  document.querySelector('#feels-like');
        this.humidity = document.getElementById('humidity')
        this.speed =  document.querySelector('#wind');
        this.all =  document.querySelector('#clouds');
        this.name =  document.querySelector('#city'); 
        this.pressure = document.querySelector('#pressure')
    }
    create(weather){
        this.description.textContent =`Description: ${weather.weather[0].description}`;
        this.icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        this.temp.textContent = ` ${weather.main.temp}°F`;
        this.feels_like.textContent =`Feels Like : ${weather.main.feels_like}°F`;
        this.humidity.textContent = `Humidity: ${weather.main.humidity}%`
        this.speed.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
        this.all.textContent = ` Clouds: ${weather.clouds.all}`; 
        this.name.textContent = `City : ${weather.name}`; 
        this.pressure.textContent = `Pressure: ${weather.main.pressure} /hpa`
    }
} 
