/**
    * @description      : 
    * @author           : christian
    * @group            : 
    * @created          : 26/10/2021 - 13:05:47
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 26/10/2021
    * - Author          : christian
    * - Modification    : 
**/
import { Timer, Control } from "./Actions";
export class Player { 
    protected control?: Control;
    constructor(protected picked?: string) {
        this.control = this.option();
    }
    private option(): Control {
        let picked: HTMLElement = document.getElementById(this.picked);
        let o: Control = {
            media: picked.querySelector("[data-picked='media']"),
            play: picked.querySelector("[data-picked='play']"),
            stop: picked.querySelector("[data-picked='stop']"),
            timer: picked.querySelector("[data-picked='timer']"),
            seperated: picked.querySelector("[data-picked='seperated']"),
            progress:  picked.querySelector("[data-picked='progress']"),
            duration: picked.querySelector("[data-picked='duration']"),
            rwd: picked.querySelector("[data-picked='rwd']"),
            fwd: picked.querySelector("[data-picked='fwd']"),
            volume: picked.querySelector("[data-picked='volume']"),
            screen: picked.querySelector("[data-picked='fullscreen']"),
            parent: picked.parentElement
        };

        return o;
    }
    init(): void {
        if (this.control) {
            this.control.play.addEventListener('click', this.playOrPause.bind(this));
            this.control.stop.addEventListener('click', this.stop.bind(this));
            this.control.progress.addEventListener('input', this.progress.bind(this));
            this.control.rwd.addEventListener('click', this.backward.bind(this));
            this.control.fwd.addEventListener('click', this.fordward.bind(this));
            this.control.volume.addEventListener('input', this.volume.bind(this));
            this.control.media.addEventListener('timeupdate', this.timeUpdate.bind(this));
            this.control.media.addEventListener('click', this.playOrPause.bind(this));
            this.control.media.addEventListener('loadedmetadata', this.loaded.bind(this));
            this.control.media.addEventListener('ended', this.ended.bind(this));
            this.control.screen.addEventListener('click', this.handleFullscreen.bind(this));
        }
    }
    private playOrPause(): void {
        if (this.control.media.paused) {
            let classed = this.control.play.classList
                .contains('fa-play') ? "fa-play" : "fa-undo-alt";
            this.control.media.play();
            this.control.play.classList.replace(classed, "fa-pause");
        } else {
            let classed = this.control.play.classList
                .contains('fa-pause') ? "fa-pause" : "fa-undo-alt";
            this.control.media.pause();
            this.control.play.classList.replace(classed, "fa-play");
        }
    }
    private stop(): void {
        if (!this.control.media.paused) {
            this.control.play.classList.replace("fa-pause", "fa-play");
            this.control.media.pause();
            this.control.media.currentTime = 0;
            this.control.progress.value = 0;
            new Timer('h:m:s', this.control.timer, 0);
        }
    }
    private progress(): void {
        if (this.control.media) {
            this.control.media.currentTime = this.control.progress.value;
            this.control.progress.max = Math.floor(this.control.media.duration);
        }
    }
    private timeUpdate(): void {
        if (this.control.media) {
            new Timer('h:m:s', this.control.timer, Math.floor(this.control.media.currentTime));
            this.control.progress.value = this.control.media.currentTime;
            this.control.progress.max = Math.floor(this.control.media.duration);
        }
    }
    private loaded(): void {
        if (this.control) {
            this.control.seperated.innerHTML = "&#10072;";
            this.control.media.volume = this.control.volume.value;
            new Timer('h:m:s', this.control.timer, Math.floor(this.control.media.currentTime));
            if (!isNaN(Math.floor(this.control.media.duration))) {
                new Timer('h:m:s', this.control.duration, Math.floor(this.control.media.duration));
                this.control.progress.max = Math.floor(this.control.media.duration);
            }
        }
    }
    private ended(): void {
        if (this.control) {
            let classed = this.control.play.classList
                .contains('fa-pause') ? "fa-pause" : "fa-undo-alt";
            this.control.play.classList.replace(classed, "fa-undo-alt");
        }
    }
    private backward(): void {
        if (this.control.media.currentTime >=3) {
            this.control.media.currentTime -= 3;
            new Timer('h:m:s', this.control.timer, Math.floor(this.control.media.currentTime));
            this.control.progress.value = this.control.media.currentTime;
            this.control.progress.max = Math.floor(this.control.media.duration);
        }
    }
    private fordward(): void {
        if (this.control.media.currentTime <= this.control.media.duration - 3) {
            this.control.media.currentTime += 3;
            new Timer('h:m:s', this.control.timer, Math.floor(this.control.media.currentTime));
            this.control.progress.value = this.control.media.currentTime;
            this.control.progress.max = Math.floor(this.control.media.duration);
        }

    }
    private volume(): void {
        if (this.control.media) {
            this.control.media.volume = this.control.volume.value;
        }
    }
    private handleFullscreen(): void {       
        if (this.isFullScreen()) {
            this.GoOutFullscreen();
            this.control.screen.classList
                .replace("fa-expand-arrows-alt", "fa-expand");
        } else {
            this.GoInFullscreen(this.control.parent);
            this.control.screen.classList
                .replace("fa-expand", "fa-expand-arrows-alt");
        }
    }
    private GoInFullscreen(element: any): void {
        if(element.requestFullscreen)
            element.requestFullscreen();
        else if(element.mozRequestFullScreen)
            element.mozRequestFullScreen();
        else if(element.webkitRequestFullscreen)
            element.webkitRequestFullscreen();
        else if(element.msRequestFullscreen)
            element.msRequestFullscreen();
    }
    private GoOutFullscreen(): void {
        if(document.exitFullscreen)
            document.exitFullscreen();
        else if(document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if(document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if(document.msExitFullscreen)
         document.msExitFullscreen();
    }

    isSupported() {
        // Le navigateur prend-il réellement 
        // en charge l'élément vidéo ?
        return !!document.createElement('video')
            .canPlayType;
    }
    isFullScreen() {
        // Vérifie si le document est actuellement
        // en mode plein écran
        return !!(
            document.fullScreen
            || document.webkitIsFullScreen
            || document.mozFullScreen
            || document.msFullscreenElement
            || document.fullscreenElement
        );
    }
}