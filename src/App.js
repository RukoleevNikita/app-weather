// закрытие блока поиска при клике на другую область 
//! переписать directionDetermination

import React from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import DATA_CITIES from './arrayItemsCities.json'

import './App.scss';

export const TemperContext = React.createContext(); // контекст для Main 

function App() {
  const [russianCitiesData, setRussianCitiesData] = React.useState([]); 
  const [dataWeatherCity, setDataWeatherCity] = React.useState({});
  const [dropdownListOnInput, setDropdownListOnInput] = React.useState(false);
  const [cityName, setCityName] = React.useState('');
  const [searchValue, setSearchValue] = React.useState(''); 
  const [directionWind, setDirectionWind] = React.useState('');

  const [tempFormatHandler, setTempFormatHandler] = React.useState(true); // флаг для показа Цельсия или Фаренгейта

  const filtredItemsArrayCities = DATA_CITIES.filter(item => item.hasOwnProperty('city'));

  const filterCity = (searchText, listOfCity) => {
    if (!searchText) {
      setDropdownListOnInput(false);
      return listOfCity;
    }
    
    return listOfCity.filter(({ city }) => city.toLowerCase().includes(searchText.toLowerCase()));
  }

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      const filtredCity = filterCity(searchValue, filtredItemsArrayCities);
      setRussianCitiesData(filtredCity);
    }, 300);

    return () => clearTimeout(debounce)
  }, [searchValue]);

  const getDataWeather = (arrGeoPositionData) => {
    try {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${arrGeoPositionData[0]}&lon=${arrGeoPositionData[1]}&units=metric&lang=ru&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`).then(res => {
        setDataWeatherCity(res.data);
        directionDetermination(res.data.wind.deg);
        console.log(res.data);
      });
    } catch(error) {
      console.log(error);
    }
  }

  const handlerClickOnCity = (e) => {
    let cityName = e.target.textContent;

    setCityName(cityName);

    filtredItemsArrayCities.forEach((item, index) => {
      if (cityName === item.city) {
        getDataWeather([item.geo_lat, item.geo_lon]);
      }
    }) 

    setSearchValue(cityName);
    setDropdownListOnInput(false);
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
    setDropdownListOnInput(true);
  }

  const changeCity = () => {
    setCityName(false);
    setSearchValue('');
    setDataWeatherCity({})
  }

  const toggleTempFormatHandler = () => setTempFormatHandler(prev => !prev); // смена стейта для переключателя 
  
  function directionDetermination(temp) { //!!!!!!!!!
    if ( Number(temp) >= 191.25  && Number(temp) <= 236.25 ) setDirectionWind('юго-заподный');
    if ( Number(temp) >= 348.75  && Number(temp) <= 11.25 ) setDirectionWind('северный');
    if ( Number(temp) >= 11.25 && Number(temp) <= 78.75 ) setDirectionWind('северо-восточный');
    if ( Number(temp) >= 78.75  && Number(temp) <= 101.25 ) setDirectionWind('восточный');
    if ( Number(temp) >= 168.75 && Number(temp) <= 191.25 ) setDirectionWind('южный');
    if ( Number(temp) >= 281.25  && Number(temp) <= 348.75 ) setDirectionWind('северо-западный');
    if ( Number(temp) >= 258.75  && Number(temp) <= 281.25 ) setDirectionWind('западный');
    if ( Number(temp) >= 101.25  && Number(temp) <= 146.25 ) setDirectionWind('юго-восточный');
  }


  return (
    <TemperContext.Provider value={tempFormatHandler}>
      <div className="App">
        <Header
          cityName={cityName}
          onChangeSearchInput={onChangeSearchInput}
          searchValue={searchValue}
          changeCity={changeCity}
          dropdownListOnInput={dropdownListOnInput} 
          russianCitiesData={russianCitiesData}
          handlerClickOnCity={handlerClickOnCity}
          setSearchValue={setSearchValue}
          toggleTempFormatHandler={toggleTempFormatHandler}
    
        />

        <Main 
          dataWeatherCity={dataWeatherCity}
        />

        <Footer 
          dataWeatherCity={dataWeatherCity}
          directionWind={directionWind}
        />
      </div>
    </TemperContext.Provider>
  );
}

export default App;
