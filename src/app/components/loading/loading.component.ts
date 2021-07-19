import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @ViewChild('loadingC', {static: true}) loadingCanvas: ElementRef<HTMLCanvasElement>;
  cube: any;
  renderer: any;
  scene: any;
  cam: any;

  constructor() { }

  ngOnInit(): void {
    this.setupScene();
    this.render();
  }

  setupScene(): void {
    this.scene = new THREE.Scene();
    this.cam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.loadingCanvas.nativeElement,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    const loader = new THREE.TextureLoader();
    let texture = loader.load('/assets/tezos-xtz-logo.svg')
    const material2 = new THREE.MeshBasicMaterial( { map:  texture} );
    const geometry = new THREE.BoxGeometry();
    this.cube = new THREE.Mesh( geometry, material2 );

    this.scene.add( this.cube );
    this.cam.position.z = 5;
  }

  render(): void {
    requestAnimationFrame(() => {
        this.render();
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.cam)
    });
  }
}
