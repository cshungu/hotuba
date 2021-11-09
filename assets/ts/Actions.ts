/**
    * @description      : 
    * @author           : christian
    * @group            : 
    * @created          : 21/10/2021 - 13:27:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/10/2021
    * - Author          : christian
    * - Modification    : 
**/
declare global {
    interface Document {
        fullScreen?: () => Promise<void>;
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        webkitIsFullScreen?: () => Promise<void>;
        mozFullScreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
    }
    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}
export class Timer {
    constructor(
        protected template?: string,
        protected selected?: any,
        protected duration?: number
    ) {
        this.render();
    }
    render() {
        let hour: string   = this.hour();
        let minute: string = this.minute();
        let second: string = this.second();
        let out: string    = this.template
            .replace('h', hour)
            .replace('m', minute)
            .replace('s', second);
        this.selected.innerText = out.trim().replace('00:', '');
    }
    hour(): string | null {
        let h: number = Math.floor(Number(this.duration / 3600));
        return (h < 10) ? '0' + String(h) : String(h);
    }
    minute(): string | null {
        let m:number = Math.floor(Number((this.duration % 3600) / 60));
        return (m < 10) ? '0' +  String(m) :  String(m);
    }
    second(): string | null {
        let s:number = Math.floor(Number(this.duration % 60));
        return (s < 10) ? '0' +  String(s) :  String(s);
    }
}
export interface Control {
    media?: HTMLVideoElement;
    play?: HTMLButtonElement;
    stop?: HTMLButtonElement;
    timer?: HTMLSpanElement;
    rwd?: HTMLButtonElement;
    fwd?: HTMLButtonElement;
    seperated?: HTMLSpanElement;
    duration?: HTMLSpanElement;
    progress?: any;
    volume?: any;
    screen?: HTMLButtonElement;
    picked?: any;
    parent?: any;
}