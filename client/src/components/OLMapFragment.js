import React from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { SERVER_URL } from "./../config";

// Start Openlayers imports
import { Map, View } from "ol";
import {
  Tile as TileLayer
  // Vector as VectorLayer
} from "ol/layer";
import { TileWMS as TileWMSSource } from "ol/source";
import {
  Select as SelectInteraction,
  defaults as DefaultInteractions
} from "ol/interaction";
import { defaults as DefaultControls } from "ol/control";

import { Projection, get as getProjection } from "ol/proj";

// End Openlayers imports

class OLMapFragment extends React.Component {
  // TODO: Process querystring params for BBox, and list of images to process
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions() {
    const h = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: h });
  }
  UNSAFE_componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }
  componentDidMount() {
    const qsValues = queryString.parse(window.location.search);
    console.log(qsValues);

    // Create an Openlayer Map instance with two tile layers
    const map = new Map({
      //  Display the map in the div with the id of map
      target: "map",
      layers: [
        new TileLayer({
          source: new TileWMSSource({
            url: "https://omar.ossim.io/omar-mapproxy/service",
            params: {
              LAYERS: "o2-basemap-basic",
              FORMAT: "image/jpeg"
            },
            projection: "EPSG:4326"
          }),
          name: "Reference"
        }),
        new TileLayer({
          source: new TileWMSSource({
            url: `${SERVER_URL}/wms`,
            params: {},
            projection: "EPSG:4326"
          }),
          name: "Overlay"
        })
      ],
      view: new View({
        //                projection: 'EPSG:3857',
        projection: "EPSG:4326",
        center: [0, 0],
        zoom: 2
      })
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    const style = {
      width: "100%",
      height: this.state.height,
      backgroundColor: "#cccccc"
    };
    return (
      <Grid container>
        <Grid item xs={12}>
          <div id="map" style={style}></div>
        </Grid>
      </Grid>
    );
  }
}
export default OLMapFragment;
