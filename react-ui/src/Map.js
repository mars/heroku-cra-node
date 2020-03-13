import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

const mapStyle = {
  version: 8,
  sources: {
      'osm-tiles': {
          type: 'raster',
          tiles: [
              'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  })

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle={mapStyle}
    />
  )
}
