        <template>
    <div
        class="player-body"
        :class="{
            'paused': paused,
            'no-cursor': cursorOff
        }"
        @mousemove="cursorStatus"
        @mousedown="cursorStatus"
        :style="{width, height}">
        <div
            class="video-container"
            :class="{'no-events': cursorOff}">
            <video
                ref="video"
                @abort="abort"
                @canplay="canplay"
                @canplaythrough="canplaythrough"
                @durationchange="durationchange"
                @emptied="emptied"
                @ended="ended"
                @error="error"
                @loadeddata="loadeddata"
                @loadedmetadata="loadedmetadata"
                @loadstart="loadstart"
                @pause="pause"
                @play="play"
                @playing="playing"
                @progress="progress"
                @ratechange="ratechange"
                @seeked="seeked"
                @seeking="seeking"
                @stalled="stalled"
                @suspend="suspend"
                @timeupdate="timeupdate"
                @volumechange="volumechange"
                @waiting="waiting"
            ></video>
            <div class="video-controls">
                <div class="video-cover" @mouseup="playPause">
                    <div
                        v-if="fadeOut"
                        :class="{'fade-out': fadeOut}"
                        @animationend="fadeOut=false">
                        <div :class="{'dim-play': paused, 'dim-pause': !paused}"></div>
                    </div>
                </div>
                <div class="video-title">{{videoTitle}}</div>
                <div class="control-panel">
                    <div class="progress-panel">
                        <div
                            class="seeking"
                            @mousedown="seekStart"
                            @touchstart="seekStart"
                            @mousemove="thumbnailBar"
                        ></div>
                        <div
                            class="progress-holder"
                            ref="progressHolder"
                        ></div>
                        <div
                            class="thumbnail-bar"
                            :style="{width:thumbnailBarWidth+'%'}"
                        ></div>
                        <div
                            class="buffered"
                            :style="{width:bufferedWidth+'%'}"
                        ></div>
                        <div
                            class="progress"
                            :style="{width:progressWidth+'%'}"
                        ></div>
                        <div
                            class="progress-handle"
                            :class="{block: handleDisplay}"
                            :style="{left: progressWidth+'%'}"
                        ></div>
                    </div>
                    <div>
                        <button
                            class="play"
                            @click="playPause"
                        ></button>
                    </div>
                    <div
                        class="volume-panel"
                        :class="{'controlling': volumeControlling}"
                        @wheel="volumeWheel">
                        <svg class="speaker-icon" :class="volumeIcon" width="23" height="23" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="m78.3703,21.04485c-2.41239,-0.28355 -4.97,0.45243 -6.99388,2.4763l-36.77647,36.77647l-17.1333,0c-9.46617,0 -17.1333,7.66717 -17.1333,17.1333l0,17.1333c0,9.46617 7.66717,17.1333 17.1333,17.1333l17.1333,0l36.77647,36.77647c5.397,5.397 14.62354,1.576 14.62354,-6.05691l0,-112.83903c0,-4.77057 -3.60905,-8.06062 -7.62969,-8.5332l0.00002,0.00002l0.00001,-0.00002z" />
                            <path class="volume1" transform="translate(78.5, 21)" fill="#ffffff" d="m32.99498,26.72059c-4.31761,0.16383 -8.23203,3.78138 -8.23203,8.60013l0,0.20078c0,3.01547 1.58604,5.82198 4.23314,7.27832c7.88133,4.3433 12.90021,12.62671 12.90021,22.15292c0,9.52613 -5.01886,17.80138 -12.90021,22.13619c-2.6471,1.45633 -4.23314,4.27959 -4.23314,7.29506l0,0.18405c0,6.43357 6.9801,10.74141 12.56551,7.54604c13.0213,-7.44443 21.70108,-21.28725 21.70108,-37.16125c0,-15.874 -8.67978,-29.70825 -21.70108,-37.16125c-1.39637,-0.7967 -2.89433,-1.12544 -4.33352,-1.07083l0.00005,-0.00017l-0.00001,0.00001z" />
                            <path class="volume2" transform="translate(111.5,48)" fill="#ffffff" d="m0.28449,-36.35809c-4.56004,-0.03151 -8.51648,3.77857 -8.51648,8.58339c0,3.78647 2.49076,7.19788 6.15729,8.13164c24.43102,6.22422 42.82158,27.17578 45.02521,52.70509c0.14691,1.70196 0.21752,3.43056 0.21752,5.17012c0,27.8331 -19.18296,51.23601 -45.24276,57.87521c-3.66653,0.93377 -6.15729,4.34518 -6.15729,8.13165c0,5.49123 5.17909,9.68595 10.50755,8.33242c33.3586,-8.47243 58.02583,-38.59053 58.02583,-74.33923c0,-35.7487 -24.66722,-65.86684 -58.02583,-74.33923c-0.66605,-0.16919 -1.33964,-0.24648 -1.99107,-0.25098l0.00004,-0.00008l-0.00001,0z" />
                            <line class="diagonal" stroke="#ffffff" stroke-width="20.5" x1="15.80624" y1="15.80624" x2="156.19375" y2="156.19375"/>
                        </svg>
                        <div class="volume-wrap">
                            <div
                                class="volume-controlling"
                                @mousedown="volumeControllingStart"
                                @touchstart="volumeControllingStart"
                            ></div>
                            <div
                                ref="volumeHolder"
                                class="volume-holder"
                            ></div>
                            <div
                                :style="{width:volumeWidth}"
                                class="volume-level"
                            ></div>
                            <div
                                :style="{left:volumeWidth}"
                                class="volume-handle"
                            ></div>
                        </div>
                    </div>
                    <div class="duration-panel">
                        <span>{{formatedCurrentTime}} / {{formatedDuration}}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import Hls from 'hls.js'
    export default {
        name: 'Player',
        props: {
            src: {
                type: String,
                default: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100vh'
            },
            title: {
                type: String,
            },
        },
        data: function () {
            return {
                video: null,
                playPromise: null,
                fadeOut: false,
                paused: true,
                keepPlay: true,
                cursorOff: true,
                cursorTimer: null,
                bufferedWidth: 0,
                progressWidth: 0,
                thumbnailBarWidth: 0,
                progressClientX: 0,
                volumeClientX: 0,
                handleDisplay: false,
                videoTitle: '',
                muted: false,
                volume: 1.0,
                volumeIcon: 'max',
                volumeControlling: false,
                duration: 0,
                currentTime: 0,
            }
        },
        mounted: function () {
            this.videoTitle = this.title
            this.video = this.$refs.video
            if (this.src.substr(this.src.length - 4) == 'm3u8') {
                if (Hls.isSupported()) {
                    let hls = new Hls()
                    hls.loadSource(this.src)
                    hls.attachMedia(this.video)
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        this.playPromise = this.video.play().catch(() => {
                            this.video.muted = true
                            this.playPromise = this.video.play()
                        })
                    })
                } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
                    this.video.src = this.src;
                    this.video.addEventListener('canplay', () => {
                        this.playPromise = this.video.play().catch(() => {
                            this.video.muted = true
                            this.playPromise = this.video.play()
                        })
                    })
                }
            } else {
                this.video.src = this.src
                this.playPromise = this.video.play().catch(() => {
                    this.video.muted = true
                    this.playPromise = this.video.play()
                })
            }

        },
        watch: {
            volume: function () {
                this.video.volume = this.volume
                console.log(this.volume)
                if (this.volume == 0) {
                    this.volumeIcon = ''
                } else if (0.5 < this.volume) {
                    this.volumeIcon = 'max'
                } else {
                    this.volumeIcon = 'mid'
                }
            }
        },
        methods: {
            playPause: function() {
                this.fadeOut = false
                if (this.paused) {
                    this.playPromise = this.video.play()
                } else {
                    if (this.playPromise) {
                        this.playPromise.then(() => {
                            this.video.pause()
                        }).catch(() => {
                            this.video.pause()
                        })
                    } else {
                        this.video.pause()
                    }
                }
            },
            abort: function () {
                console.log('abort')
            },
            canplay: function () {
                console.log('canplay')
            },
            canplaythrough: function () {
                console.log('canplaythrough')
            },
            durationchange: function () {
                console.log('durationchange')
            },
            emptied: function () {
                console.log('emptied')
            },
            ended: function () {
                console.log('ended')
            },
            error: function () {
                console.log('error')
            },
            loadeddata: function () {
                console.log('loadeddata')
            },
            loadedmetadata: function () {
                console.log('loadedmetadata')
                this.duration = this.video.duration
            },
            loadstart: function () {
                console.log('loadstart')
            },
            pause: function () {
                this.fadeOut = true
                this.paused = true
                console.log('pause')
            },
            play: function () {
                console.log('play')
                this.fadeOut = true
                this.paused = false
            },
            playing: function () {
                console.log('playing')
            },
            progress: function () {
                console.log('progress')
            },
            ratechange: function () {
                console.log('ratechange')
            },
            seeked: function () {
                console.log('seeked')
            },
            seeking: function () {
                console.log('seeking')
            },
            stalled: function () {
                console.log('stalled')
            },
            suspend: function () {
                console.log('suspend')
            },
            timeupdate: function () {
                console.log('timeupdate')
                if (this.progressClientX) {
                    let bar = this.$refs.progressHolder.getBoundingClientRect()
                    let temp = ((this.progressClientX - bar.x) / (bar.width) * 100)
                    this.progressWidth = temp
                } else {
                    let bp = this.video.buffered.end(this.video.buffered.length - 1) / this.video.duration
                    let bw = bp * 100
                    let pw = this.video.currentTime / this.video.duration * 100
                    this.bufferedWidth = bw
                    this.progressWidth = pw
                    this.currentTime = this.video.currentTime
                }
            },
            volumechange: function () {
                console.log('volumechange')
            },
            waiting: function () {
                console.log('waiting')
            },
            seekStart: function (e) {
                this.keepPlay = !this.paused
                if (!this.paused) {
                    if (this.playPromise) {
                        this.playPromise.then(() => {
                            this.video.pause()
                        }).catch(() => {
                            this.video.pause()
                        })
                    } else {
                        this.video.pause()
                    }
                }
                this.seekMove(e)
                this.handleDisplay = true
                window.addEventListener('mousemove', this.seekMove)
                window.addEventListener('mouseup', this.seekEnd)
                window.addEventListener('touchmove', this.seekMove)
                window.addEventListener('touchend', this.seekEnd)
            },
            seekMove: function (e) {
                if (e.type.indexOf('mouse') == 0) {
                    this.progressClientX = e.clientX
                } else if (e.type.indexOf('touch') == 0) {
                    this.progressClientX = e.touches[0].clientX
                }
                let bar = this.$refs.progressHolder.getBoundingClientRect()
                let temp = ((this.progressClientX - bar.x) / (bar.width) * 100)
                if (temp > 100) temp = 100
                if (temp < 0) temp = 0
                this.progressWidth = temp
            },
            seekEnd: function () {
                this.video.currentTime = ((this.progressWidth * this.video.duration) / 100).toFixed(6)
                this.handleDisplay = false
                this.progressClientX = 0
                if (this.keepPlay) {
                    this.playPause()
                }
                window.removeEventListener('mousemove', this.seekMove)
                window.removeEventListener('mouseup', this.seekEnd)
                window.removeEventListener('touchmove', this.seekMove)
                window.removeEventListener('touchend', this.seekEnd)
            },
            volumeWheel: function (e) {
                if (e.deltaY < 0) {
                    this.volume = parseFloat((this.volume + 0.1).toFixed(1)) > 1 ? 1 : parseFloat((this.volume + 0.1).toFixed(1))
                } else if (e.deltaY > 0) {
                    this.volume = parseFloat((this.volume - 0.1).toFixed(1)) < 0 ? 0 : parseFloat((this.volume - 0.1).toFixed(1))
                }
            },
            volumeControllingStart: function (e) {
                this.volumeControllingMove(e)
                this.volumeControlling = true
                window.addEventListener('mousemove', this.volumeControllingMove)
                window.addEventListener('mouseup', this.volumeControllingEnd)
                window.addEventListener('touchmove', this.volumeControllingMove)
                window.addEventListener('touchend', this.volumeControllingEnd)
            },
            volumeControllingMove: function (e) {
                this.volumeClientX = (e.clientX) ? e.clientX : e.touches[0].clientX
                if (e.type.indexOf('mouse') == 0) {
                    this.volumeClientX = e.clientX
                } else if (e.type.indexOf('touch') == 0) {
                    this.volumeClientX = e.touches[0].clientX
                }

                let bar = this.$refs.volumeHolder.getBoundingClientRect()
                let temp = (this.volumeClientX - bar.x) / (bar.width)
                if (temp > 1) temp = 1
                if (temp < 0) temp = 0
                this.volume = temp
            },
            volumeControllingEnd: function () {
                this.volumeControlling = false
                window.removeEventListener('mousemove', this.volumeControllingMove)
                window.removeEventListener('mouseup', this.volumeControllingEnd)
                window.removeEventListener('touchmove', this.volumeControllingMove)
                window.removeEventListener('touchend', this.volumeControllingEnd)
            },

            cursorStatus: function () {
                this.cursorOff = false
                if (this.cursorTimer) {
                    clearTimeout(this.cursorTimer)
                }
                this.cursorTimer = setTimeout(() => {
                    this.cursorOff = true
                }, 2000)
            },
            thumbnailBar: function (e) {
                let bar = this.$refs.progressHolder.getBoundingClientRect()
                let temp = ((e.clientX - bar.x) / (bar.width) * 100)
                this.thumbnailBarWidth = temp
            },
            secondsFormatter: function (seconds) {
                let pad = (seconds) => {
                    return seconds < 10 ? "0" + seconds : seconds
                }
                let timeArray = []
                let h = Math.floor(seconds / 3600)
                let m = Math.floor(seconds % 3600 / 60)
                let s = Math.floor(seconds % 60)
                if (h > 0) {
                    timeArray.push(h)
                    timeArray.push(pad(m))
                } else {
                    timeArray.push(m)
                }
                timeArray.push(pad(s))
                return timeArray.join(':')
            }
        },
        computed: {
            formatedDuration: function () {
                return this.secondsFormatter(this.duration)
            },
            formatedCurrentTime: function () {
                return this.secondsFormatter(this.currentTime)
            },
            volumeWidth: function () {
                return (this.volume * 100) + '%'
            }
        },
    }
    </script>
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400&display=swap&subset=korean');
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;

    }
    .no-cursor {
        cursor: none;
    }
    .no-events {
        pointer-events: none;
    }
    .player-body {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: black;
        color: #ddd;
        font-family: 'Noto Sans KR', sans-serif;
        /* -webkit-font-smoothing: antialiased; */
    }
    .video-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        justify-content: center;
        -ms-flex-pack: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        align-items: center;
    }
    .video-container>video {
        object-fit: contain;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .video-controls {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
    }
    .play {
        margin: 10px;
        border: 0;
        background: transparent;
        box-sizing: border-box;
        width: 0;
        height: 20px;
        border-color: transparent transparent transparent #ffffff;
        transition: 200ms all ease;
        cursor: pointer;
        border-style: double;
        border-width: 0 0 0 18.3px;
    }
    .paused .play {
        border-style: solid;
        border-width: 10px 0 10px 18.3px;
    }
    .control-panel {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 44px;
        padding: 0 20px;
        background: rgba(0,0,0,0);
        background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,0,0,0)), color-stop(100%, rgba(0,0,0,0.4)));
        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
        background: -o-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
        background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000', GradientType=0 );
        /* background: rgba(255, 0, 0, 0.2); */
        display: none;
        flex-wrap: wrap;
    }
    .video-title {
        position: absolute;
        width:100%;
        height: 44px;
        background: rgba(0,0,0,0.4);
        background: -moz-linear-gradient(top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,0,0,0.4)), color-stop(100%, rgba(0,0,0,0)));
        background: -webkit-linear-gradient(top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
        background: -o-linear-gradient(top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
        background: -ms-linear-gradient(top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
        background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
        /* background: rgba(255, 0, 0, 0.2); */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000', GradientType=0 );
        display: none;
        padding:0 20px;
        font-size: 1.2rem;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        line-height: 44px;
    }
    .video-cover {
        position: absolute;
        width:100%;
        top:0;
        bottom:0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .fade-out {
        background-color: rgba(0, 0, 0, 0.7);
        border: 0;
        border-radius: 100%;
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation-name: fade-out;
        animation-duration: 0.5s;
        opacity: 0;
    }
    .fade-out>.dim-play {
        border: 0;
        background: transparent;
        box-sizing: border-box;
        width: 0;
        height: 40px;
        border-color: transparent transparent transparent #ffffff;
        border-style: double;
        border-width: 0 0 0 34px;
    }
    .fade-out>.dim-pause {
        border: 0;
        background: transparent;
        box-sizing: border-box;
        width: 0;
        height: 40px;
        border-color: transparent transparent transparent #ffffff;
        margin-left: 8px;
        border-style: solid;
        border-width: 20px 0 20px 34px;
    }
    @keyframes fade-out {
        from {
            transform: scale(0.45);
            opacity: 1;
        }
        to {
            transform: scale(0.9);
            opacity: 0;
        }
    }
    .video-controls:hover .control-panel,.paused .control-panel {
        display: flex;
    }

    .paused .video-title {
        display: block;
    }

    .progress-panel {
        position: relative;
        bottom: 0;
        height: 4px;
        width: 100%;
    }
    .progress-holder {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 4px;
        border-radius: 4px;
        background: rgba(180, 180, 180, 0.3);
    }
    .progress {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 4px;
        border-radius: 4px;
        /* background: rgba(10, 60, 210, 0.7); */
        background: rgb(77, 112, 217);
    }
    .progress-handle {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 0;
        width: 0;
        border-radius: 8px;
        /* background: rgba(10, 60, 210, 0.7); */
        transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease;
        background: rgb(77, 112, 217);
    }

    .buffered {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 4px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.3);
    }
    .seeking {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 4px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 4;
        /* background: rgba(180, 0, 0, 0.3); */
    }
    .thumbnail-bar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 0;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.3);
    }
    .seeking:hover {
        height: 16px;
        margin: auto -8px;
    }
    .seeking:hover~.progress,
    .seeking:hover~.buffered,
    .seeking:hover~.progress-holder,
    .seeking:hover~.thumbnail-bar {
        height: 6px;
    }
    .seeking:hover~.progress-handle {
        height: 16px;
        width: 16px;
        margin: auto -8px;
    }

    .progress-handle.block {
        height: 16px;
        width: 16px;
        margin: auto -8px;
    }

    .volume-panel {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 10px;
        transition: width 200ms ease;
        width:23px;
        /* background: red; */
        overflow: hidden;
    }
    .volume-panel:hover ,.volume-panel.controlling {
        width:107px;
        pointer-events: initial;
    }

    .volume-wrap{
        position: absolute;
        left:33px;
        width: 60px;
        margin: 0 7px;
    }
    .volume-controlling {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto -7px;
        height: 14px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 4;
    }

    .volume-holder {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 4px;
        border-radius: 4px;
        background: rgba(180, 180, 180, 0.3);
    }
    .volume-level {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 4px;
        border-radius: 4px;
        /* background: rgba(10, 60, 210, 0.7); */
        background: #fff;  /*  rgb(77, 112, 217); */
    }

    .volume-handle {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto 0;
        height: 0;
        width: 0;
        border-radius: 7px;
        background: #fff;
        height: 14px;
        width: 14px;
        margin: auto -7px;
    }

    .duration-panel {
        display: flex;
        justify-content: center;
        align-items: center;
        /* font-size: 0.775rem; */
        font-size: 0.85rem;
        letter-spacing: 0.032rem;
        font-weight: 400;
        margin: 0 10px;
    }

    .diagonal,.volume2{
        transition: 200ms opacity ease;
    }
    .speaker-icon.max>.diagonal {
        opacity: 0;
    }
    .speaker-icon.mid>.volume2 {
        opacity: 0;
    }
    .speaker-icon.mid>.diagonal {
        opacity: 0;
    }

</style>