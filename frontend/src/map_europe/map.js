import {MapContainer, Polygon, TileLayer} from 'react-leaflet'
import {landData} from './europe'


function Map() {
    return (<MapContainer 
        center={[55.287175894140645, 14.90326637107352]}
        dragging={false}
        zoom={3.5}
        maxZoom={3.5}
        minZoom={3.5}
        zoomControl={false}
        style={{ width: '30%', height: '65vh'}}>
      <TileLayer 
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=eSTvidUJfgEQsuinQFfC"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        
        landData.features.map((land) => {
        
          const coordinates = land.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          if (land.geometry.type == 'MultiPolygon') {

            // console.log(land.properties.NAME)
            // for (let polygon in land.geometry.coordinates) {
            //   for (let coordinates in polygon) {
            //     coordinates.map((item) => [item[1], item[0]]);
            //   }
            //   drawPolygon(coordinates)
            // }
            for (let i = 0; i < land.geometry.coordinates.length; i++) {
              for(let j = 0; j < land.geometry.coordinates[i].length; j++) {
                coordinates.push(land.geometry.coordinates[i][j].map((item) => [item[1], item[0]]));
              }
            }

          }
          return drawPolygon(coordinates)
        })
      }
      </MapContainer>
)

function drawPolygon(coordinates) {
    return(<Polygon
      pathOptions={{
        fillColor: '#FD8D3C',
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: 'white'
      }}
      positions={coordinates}
      eventHandlers={{
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            dashArray: "",
            fillColor: "#BD0026",
            fillOpacity: 0.7,
            weight: 2,
            opacity: 1,
            color: "white",
          })
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 2,
            dashArray: "3",
            color: 'white',
            fillColor: '#FD8D3C'
          });
        },
        click: (e) => {

        }
      }}
    />)
  }
}


export default Map;