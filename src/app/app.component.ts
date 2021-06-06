import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CuepointMediaData } from 'cuepoint-media-ng';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <video
        #video
        controls
        a13CuepointMedia
        [cuepoints]="cuepoints"
        [cpListen]="listenForCP"
        [goToName]="seekName"
        [goToIndex]="seekIndex"
        (cuepointEvent)="onCuePoint($event)"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
      </video>

      <div class="btn-wrap">
        <button (click)="incrementIndex()">Index++</button>
        <button (click)="gotToCuepoint('Two')">Go To Cuepoint Two</button>
        <button (click)="gotToCuepoint('Four')">Go To Cuepoint Four</button>
        <button (click)="gotToCuepoint('Five')">Go To Cuepoint Five</button>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('video', {static: true}) videoRef!: ElementRef;
  cuepoints!: CuepointMediaData[];
  listenForCP = true;
  seekName!: string;
  seekIndex = -1;

  constructor() {}

  ngOnInit(): void {
    this.cuepoints = [
      {
        name: 'One',
        time: 10,
        kind: 'event',
        func: () => console.log('This is cuepoint 1. EVENT!')
      },
      {
        name: 'Two',
        time: 20,
        kind: 'both',
        func: () => console.log('This is cuepoint 2. BOTH!')
      },
      {
        name: 'Three',
        time: 30,
        kind: 'event',
        func: () => {
          (this.videoRef.nativeElement as HTMLVideoElement).pause();
          setTimeout(() => {
            alert('This is cuepoint 3. EVENT!')
          }, 1000);
        }
      },
      {
        name: 'Four',
        time: 120,
        kind: 'nav',
        func: () => console.log('This is cuepoint 4. NAV!')
      },
      {
        name: 'Five',
        time: 460,
        kind: 'both',
        func: () => console.log('This is cuepoint 5. BOTH!')
      }
    ];
  }

  onCuePoint(cp: CuepointMediaData): void {
    console.log(cp);
  }

  gotToCuepoint(name: string): void {
    this.seekName = name;
  }

  incrementIndex(): void {
    if (this.seekIndex === this.cuepoints.length-1) {
      this.seekIndex = 0;
    } else {
      this.seekIndex++;
    }
    console.log(this.seekIndex);
  }
}
