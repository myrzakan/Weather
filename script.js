document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const search = document.querySelector(".search-box input");
  const searchClick = document.querySelector('.search-box button')
  const weather = document.querySelector(".weather-box");
  const weatherDetails = document.querySelector(".weather-details");
  const error404 = document.querySelector('.not-found');
  const cityHide = document.querySelector('.city-hide');
  const body = document.body

  const performSearch = () => {
    const APIkey = "0572cd1082ad3704272b6ebcb2c8f001";
    const city = search.value;

    if (city == "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}&lang=ru`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == '404') {
          cityHide.style.display = 'none';
          container.style.height = '28rem';
          weather.classList.remove('active');
          weatherDetails.classList.remove('active');
          error404.classList.add('active');
          search.value = ''
          
          return;
        }

        const image = document.querySelector(".weather-img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        if (cityHide.textContent == city) {
          return;
        } else {

          cityHide.style.display = 'flex'; 
          container.style.height = '35rem';
          container.classList.add('active');
          weather.classList.add('active');
          weatherDetails.classList.add('active');
          error404.classList.remove('active');
          search.value = ''

          setTimeout(() => {
            container.classList.remove('active');
          }, 1000);
        }

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "./images/clear.png";
            body.style.background = 'url(./images/clear.jpg)';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover'
            break;

          case "Rain":
            image.src = "./images/rain.png";
            body.style.background = 'url(./images/rain.jpg)';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover'
            break;

          case "Snow":
            image.src = "./images/snow.png";
            body.style.background = 'url(./images/snow.jpg)';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover'
            break;

          case "Clouds":
            image.src = "./images/cloud.png";
            body.style.background = 'url(./images/cloud.jpg)';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover'
            break;

          case "Mist":
            image.src = "./images/mist.png";
            body.style.background = 'url(./images/mist.jpg)';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover'
            break;

          case "Haze":
            image.src = "./images/mist.png";
            body.style.background = 'url(./images/mist.jpg)';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover'
            break;

          default:
            image.src = "./images/cloud.png";
            body.style.background = 'url(./images/cloud.jpg)';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover'
        }
        
        cityHide.innerHTML = `${city}`
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/`;

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');

        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone');

        elCloneInfoWind.id = 'clone-info-wind';
        elCloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
          infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
          infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
          infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
        }, 1000);

        const cloneInfoWeather = document.querySelector('#clone-info-weather');
        const cloneInfoHumidity = document.querySelector('#clone-info-humidity');
        const cloneInfoWind = document.querySelector('#clone-info-wind');
        
        if (cloneInfoWeather) {
          cloneInfoWeather.classList.remove('active-clone');
          cloneInfoHumidity.classList.remove('active-clone');
          cloneInfoWind.classList.remove('active-clone');
        
          setTimeout(() => {
            cloneInfoWeather.remove();
            cloneInfoHumidity.remove();
            cloneInfoWind.remove();
          }, 1000);
        }
      });
  };

  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  });

  search.addEventListener("focus", () => {
    error404.classList.remove('active');
  });


  searchClick.addEventListener("click", () => {
    performSearch();
  });
});
