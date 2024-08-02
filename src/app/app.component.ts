import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureTable from '@arcgis/core/widgets/FeatureTable';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Extent from '@arcgis/core/geometry/Extent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  host: {class: 'app-container'},
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  collegeLayer: FeatureLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CollegesUniversities/FeatureServer/0',
    title: 'US Colleges and Universities'
  });

  fedLayer: FeatureLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Federal_Lands/FeatureServer',
    title: 'US Federal Lands'
  });
  mapView!: MapView;


  ngAfterViewInit(): void {
    const map = new Map({
      basemap: "topo-vector"
    });

    const extent = new Extent({
      xmin: -12723283.47,
      ymin: 3676404.70,
      xmax: -11566582.41,
      ymax: 4489887.40,
      spatialReference: {
        wkid: 102100
      }
    });

    this.mapView = new MapView({
      container: this.mapContainer.nativeElement,
      map: map,
      extent: extent
    });

    this.mapView.when((view: MapView) => {
      map.add(this.collegeLayer);
      map.add(this.fedLayer);
      this.initTable(view)
    });
  };

  initTable(view: MapView) {
    const featureTable = new FeatureTable({
      layer: this.collegeLayer,
      // layers: [this.collegeLayer, this.fedLayer],
      view: view,
      container: this.tableContainer.nativeElement,
      // visibleElements: {
      //   layerDropdown: true
      // }
    })

    console.log('Feature table:', featureTable)
  }
};
