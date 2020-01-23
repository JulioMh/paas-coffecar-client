/*global google*/
import React from 'react';
import { GMap } from 'primereact/gmap';
import style from './MapStyle';


const onOverlayClick = (event)=> {
    let isMarker = event.overlay.title !== undefined;

    if (isMarker) {
        let title = event.overlay.getTitle();
        let infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<div>' + title + '</div>');
        infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());
    }
}

const map = props => {
    const options = {
        center: { lat: props.lat === '' ? 36.72016 : props.lat, lng: props.lng === '' ? -4.42034 : props.lng },
        zoom: 11,
        disableDefaultUI: true,
        styles: style
    };

    return (
        <GMap
            onMapClick={props.onMapClick}
            onOverlayDragEnd={props.onOverlayDragEnd}
            onOverlayClick={onOverlayClick}
            overlays={props.overlays} options={options}
            style={{ width: '100%', minHeight: '320px' }} />
    )
};

export default map;