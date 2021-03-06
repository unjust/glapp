import React, { useState, useEffect, useContext } from 'react';

// added this for testing
export const useMapContext = () => useContext(MapContext);

export const MapContext = React.createContext([{ testMarker: "testing" }])

export const MapContextProvider = (props) => {
  const initState = props.state || [];
  const [ mapData, setState ] = useState([]);

  // https://medium.com/@justintulk/react-anti-patterns-props-in-initial-state-28687846cc2e
  useEffect(() => {
    setState(initState);
  }, [ props.state ]);

  return (
    <MapContext.Provider value={{ mapData }}>
      { props.children }
    </MapContext.Provider>
  )
}
