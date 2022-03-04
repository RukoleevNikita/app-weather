import React from 'react';

import {TemperContext} from '../../App';

import './Header.scss';

function Header({ 
    cityName, 
    searchValue, 
    onChangeSearchInput, 
    dropdownListOnInput, 
    russianCitiesData, 
    handlerClickOnCity, 
    setSearchValue,
    changeCity,
    toggleTempFormatHandler
}) {

    const tempFlag = React.useContext(TemperContext);
    
    return (
        <header className="Header">
            <div className="Header__searchBar">
            {
                cityName ? 
                    <div className="Header__searchBar__geoPosition">
                        <div className="Header__searchBar__geoPosition-сityName">
                            {cityName}
                            <div className="Header__searchBar__geoPosition-blockButton">
                                <span>&deg;</span>
                                <div onClick={toggleTempFormatHandler} className={tempFlag ? "bgBtnSwitch" : undefined}>C</div>
                                <div onClick={toggleTempFormatHandler} className={!tempFlag ? "bgBtnSwitch" : undefined}>F</div>
                                
                            </div>    
                        </div>
                        <div className="Header__searchBar__geoPosition-wrapper">
                            <div className="Header__searchBar__geoPosition-changeCity" onClick={changeCity}>сменить город</div>
                            <img src="/image/location.png" alt="location" />
                            <div className="Header__searchBar__geoPosition-location">Моё местоположение</div>
                        </div>
                    </div>
                : 
                <div className="Header__wrapper">
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear" src="/image/btn-remove.svg" alt="remove"/>}
                    <input onChange={onChangeSearchInput} className="Header__searchBar-searchInput" value={searchValue} type="text" placeholder="введите город..."/> 
                    <ul className={"_searchResults " + (dropdownListOnInput && "Header__visible")}>
                        { 
                            russianCitiesData.length ? russianCitiesData.slice(0, 5).map((dataCity, index) => {
                                return <li key={index} className="Header__searchResults-item" onClick={handlerClickOnCity}>{dataCity.city}</li>
                            }) : <li>{'город не найден...'}</li> 
                        } 
                    </ul>
                </div>
            }
            </div>
        </header>
    );
}

export default React.memo(Header);