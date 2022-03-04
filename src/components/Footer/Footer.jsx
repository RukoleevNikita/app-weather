import React from 'react';

import './Footer.scss';

function Footer({ dataWeatherCity, directionWind }) {
    return (
        <footer className="Footer">
            <div className="Footer__data">
                <div>Ветер</div>
                {Object.keys(dataWeatherCity).length !== 0 ? <div>{dataWeatherCity.wind.speed} м/с, {directionWind}</div> : <></>}
            </div>
            <div className="Footer__data">
                <div>Давление</div>
                {Object.keys(dataWeatherCity).length !== 0 ? <div>{dataWeatherCity.main.pressure} мм рт.ст.</div> : <></>}
            </div>
            <div className="Footer__data">
                <div>Влажность</div>
                {Object.keys(dataWeatherCity).length !== 0 ? <div>{dataWeatherCity.main.humidity}%</div> : <></>}
            </div>
            <div className="Footer__data">
                <div>Вероятность дождя</div>
                {Object.keys(dataWeatherCity).length !== 0 ? <div>10%</div> : <></>}
            </div>
      </footer>
    );
}

export default React.memo(Footer);
