import ReactMapGL from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
    const accessToken = 'pk.eyJ1IjoiemFjaGFyeWdhcndvb2QiLCJhIjoiY2w5ajJud3N5NjVhMTN2dDVpdmQ5eGljZyJ9.JRNTZkLct-D9YUqEjG8ypg'
    return (
        <ReactMapGL
            initialViewState={{
                longitude: -93.64635240693596,
                latitude: 42.026419716616886,
                zoom: 13,
            }}
            style={{ width: '664px', height: '848px', borderRadius: '20px' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={accessToken}
        />
    );
}

export default Map;