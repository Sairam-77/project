import React, { useContext } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from '../data';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom'

const center = [40.63463151377654, -97.89969605983609];

export default function Map() {
  const navigate = useNavigate()
  const {setSelected} = useContext(Context);
  return <div className='map-container'>
  <div className='color-info'>
    <div>
        <div className="col" style={{background:"red"}}></div>
        <p>90%</p>
    </div>
    <div>
        <div className="col" style={{background:"orange"}}></div>
        <p>60%</p>
    </div>
    <div>
        <div className="col" style={{background:"yellow"}}></div>
        <p>40%</p>
    </div>
    <div>
        <div className="col" style={{background:"green"}}></div>
        <p>20%</p>
    </div>
    <div>
        <div className="col" style={{background:"blue"}}></div>
        <p>10%</p>
    </div>
   
  </div>
  <div className='main'>
    <MapContainer
      center={center}
      zoom={3.5}
      style={{ width: '50vw', height: '70vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/openstreetmap/?key=RPP1fod9AiFP8T4hSvGO#0.7/22.80535/2.86559"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          function getColor(d) {
            return d > 500  ? 'red' :
                   d > 200  ? 'orange' :
                   d > 100  ? 'yellow' :
                   d > 40  ? 'green' :
                   d > 20  ? 'blue' :
                              'gray';
        }
          return (<Polygon
            pathOptions={{
              fillColor:getColor(state.properties.density),
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: "",
              color: 'white'
            }}
            positions={coordinates} 
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.bindPopup(state.properties.name);
                layer.on('mouseover', function (e) {
                  this.openPopup();
              });
            //   layer.on('mouseout', function (e) {
            //     this.closePopup();
            // });
                //  setActive(state);
                // setCoor([e.latlng.lat,e.latlng.lng])
                layer.setStyle({
                  dashArray: "3",
                  fillColor: "black",
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
                  fillColor:getColor(state.properties.density),
                });
              },
              click: (e) => {
                setSelected(state)
                navigate('/detail')
              }
            }}
          />)
        })
      }
        {/* { Active && (
          <Popup 
          position={coor}
            onClose={()=>{
              setActive(null)
            }}
          >
            <div>
              <h3>{Active.properties.name}</h3>
            </div>
          </Popup>
        )} */}
      
      </MapContainer>
      <div className='card'>
        <div className='c1'>
            <img src='https://www.news9live.com/images/tot-electorate.png' alt='img'/>
            <div>
                <p>Population</p>
                <p className='text-light fs'></p>
            </div>
        </div>
      </div>
    </div>
 </div>;
}