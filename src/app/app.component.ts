import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureTable from '@arcgis/core/widgets/FeatureTable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  host: {class: 'app-container'},
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit {
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  ngAfterViewInit(): void {
    const collegeLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CollegesUniversities/FeatureServer/0',
      title: 'US Colleges and Universities'
    });

    const fedLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Federal_Lands/FeatureServer',
      title: 'US Federal Lands'
    });

    const featureTable = new FeatureTable({
      layer: fedLayer,
      // @ts-ignore
      layers: [collegeLayer, fedLayer],
      // visibleElements: {
      //   layerDropdown: true
      // },
      container: this.tableContainer.nativeElement
    });
  };
};
