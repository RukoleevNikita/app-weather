import React from 'react';

import './Main.scss';

import {TemperContext} from '../../App';
function Main({ dataWeatherCity }) {
    const tempFormat = React.useContext(TemperContext);

    // для иконки openweathermap.org/img/wn/${data.weather.icon}@2x.png 

    const [ link, setLink ]= React.useState('');
    
    return (
        <main className="Main">
            { Object.keys(dataWeatherCity).length !== 0 ? 
                <div className="Main__data">
                    <div className='Main__wrapper'>
                        <img src={`http://openweathermap.org/img/wn/${dataWeatherCity.weather[0].icon}@4x.png`} alt="img"/>
                        {
                            tempFormat ? 
                                <div className="Main__data-temper">{parseInt(dataWeatherCity.main.temp)}&deg;</div> 
                            : 
                                <div className="Main__data-temper">{parseInt((dataWeatherCity.main.temp*1.8)+32)}</div> 
                        }   
                    </div>
                    <div className="Main__data-description">{dataWeatherCity.weather[0].description}</div>       
                </div>
                :
                <div>необходимо выбрать город</div>
            }
        </main>
    );
}

export default React.memo(Main);
// export default Main;