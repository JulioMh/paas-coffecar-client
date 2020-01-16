/*global google*/
//import busIcon from '../../assets/Icons/bus.png';
//import stopIcon from '../../assets/Icons/busStop.png';
import axios from 'axios';
import busIcon from './Icons/bus.png';
import stopIcon from './Icons/busStop.png';

const createBusMarkers = (buses) => {
    const markers = buses.map(linea => linea.map(bus => createBusMarker(bus)));
    return markers;
}

const createBusMarker = (bus) => {
    let marker = new google.maps.Marker({
        position: {
            lat: parseFloat(bus.lat),
            lng: parseFloat(bus.lon)
        },
        icon: busIcon,
        title: ''+bus.codLinea
    });
    
    return marker;
}

const createStopMarkers = (stops) => {
    const markers = stops.map(stop => createStopMarker(stop));
    return markers;
}

const createStopMarker = (stop) => {
    return new google.maps.Marker({
        position: {
            lat: parseFloat(stop.lat),
            lng: parseFloat(stop.lng)
        },
        icon: stopIcon,
        title: 'Lineas: ' + stop.line.join(',\n'),
    })
}
async function getBusesByLine(lines) {
    let buses = []
    let response;
    for (let index = 0; index < lines.length - 1; index++) {
        response = await axios.get('https://coffeecar.herokuapp.com/api/buses/search/findByLine', {
            params: { line: lines[index] }
        });
        buses = [...buses, response.data];
    }
    return buses;
}

async function getNearbyStops(departure, arrival) {
    let response = await axios.get('https://coffeecar.herokuapp.com/api/stops/search/findNearby', {
        params: {
            lat: departure.lat(),
            lon: departure.lng()
        }
    })

    let buses = response.data;
    response = await axios.get('https://coffeecar.herokuapp.com/api/stops/search/findNearby', {
        params: {
            lat: arrival.lat(),
            lon: arrival.lng()
        }
    })

    buses = [...buses, ...response.data];
    return fixResponse(buses);

}

const replace = (acumulator, nearbyLines, stop) => {
    let isInAcumulator = false;
    let index = 0;
    while (!isInAcumulator && index < acumulator.length - 1) {
        isInAcumulator = acumulator[index].codParada === stop.codParada;
        index++;
    }
    if (isInAcumulator) {
        acumulator[index - 1].line.push(stop.codLinea);
    } else {
        const newStop = {
            codParada: stop.codParada,
            line: [stop.codLinea],
            lat: stop.lat,
            lng: stop.lon
        }
        acumulator.push(newStop)
    }
    if (!nearbyLines.includes(stop.codLinea))
        nearbyLines.push(stop.codLinea);
}

const fixResponse = (stops) => {
    const acumulator = [];
    const nearbyLines = [];
    stops.map(stop => replace(acumulator, nearbyLines, stop));
    const object = {
        stops: acumulator,
        lines: nearbyLines
    }
    return object;
}

async function getOverlayWithBusesAndStops(departure, arrival) {
    const allInfo = await getNearbyStops(departure, arrival);
    const stops = allInfo.stops;
    const buses = await getBusesByLine(allInfo.lines);

    const busMarker = createBusMarkers(buses);
    const stopMarker = createStopMarkers(stops);

    const aux = [];
    busMarker.map(array => array.map(marker => aux.push(marker)))

    const allMarkers = [...aux, ...stopMarker];

    return allMarkers;
}

export default getOverlayWithBusesAndStops;