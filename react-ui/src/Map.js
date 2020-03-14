import React, { useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl'
import MapPin from './MapPin'

const mapStyle = {
  version: 8,
  sources: {
      'osm-tiles': {
          type: 'raster',
          tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
          ],
          tileSize: 256,
      },
  },
  layers: [
      {
          id: 'osm-tiles',
          type: 'raster',
          source: 'osm-tiles',
          minzoom: 0,
          maxzoom: 22,
      },
  ],
}

export default function Map() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 58.36139381804461,
    longitude: 26.71875,
    zoom: 9
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('position', position)
      setViewport({
        ...viewport,
        ...position.coords,
      })
    }, console.error, { enableHighAccuracy: true })

    return () => {}
  }, [])

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={mapStyle}
      >
        <MapPin latitude={viewport.latitude} longitude={viewport.longitude} />
      </ReactMapGL>
      <div>
        Koordinaat: lat={viewport.latitude}, lng={viewport.longitude}
      </div>
    </div>

  )
}
