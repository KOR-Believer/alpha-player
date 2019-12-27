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
                >
                <!-- <source ref="source" src="./file_example_MP4_480_1_5MG.mp4" type="video/mp4"> -->
            </video>
            <div class="video-controls">
                <div class="video-cover" @mouseup="playPause">
                </div>
                <div class="video-title">{{videoTitle}}</div>
                <div class="control-panel">
                    <div class="progress-panel">
                        <div
                            class="seeking"
                            @mousedown="seekStart"
                            @mousemove="thumbnailBar">
                        </div>
                        <div
                            class="progress-holder"
                            ref="holder">
                        </div>
                        <div
                            class="thumbnail-bar"
                            :style="{width:thumbnailBarWidth}">
                        </div>
                        <div
                            class="buffered"
                            :style="{width:bufferedWidth}">
                        </div>
                        <div
                            class="progress"
                            :style="{width:progressWidth}">
                        </div>
                        <div
                            class="progress-handle"
                            :class="{block: handleDisplay}"
                            :style="{left: progressWidth}">
                        </div>
                    </div>
                    <button class="play" @click="playPause"></button>
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
                // default: './file_example_MP4_480_1_5MG.mp4'
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
                paused: true,
                keepPlay: true,
                cursorOff: true,
                cursorTimer: null,
                bufferedWidth: 0,
                progressWidth: 0,
                thumbnailBarWidth: 0,
                mousePositionX: 0,
                handleDisplay: false,
                videoTitle: '',
            }
        },
        mounted: function () {
            this.videoTitle = this.title
            this.video = this.$refs.video
            let _this = this
            if (this.src.substr(this.src.length - 4) == 'm3u8') {
                if (Hls.isSupported()) {
                    let hls = new Hls()
                    hls.loadSource(this.src)
                    hls.attachMedia(this.video)
                    hls.on(Hls.Events.MANIFEST_PARSED,function () {
                        _this.playPromise = _this.video.play().catch(() => {
                            _this.video.muted = true
                            _this.playPromise = _this.video.play()
                        })
                    })
                } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
                    this.video.src = this.src;
                    this.video.addEventListener('canplay', function () {
                        _this.playPromise = _this.video.play().catch(() => {
                            _this.video.muted = true
                            _this.playPromise = _this.video.play()
                        })
                    })
                }
            } else {
                // set source
            }

        },
        methods: {
            playPause: function() {
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
            },
            loadstart: function () {
                console.log('loadstart')
            },
            pause: function () {
                this.paused = true
                console.log('pause')
            },
            play: function () {
                console.log('play')
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
                this.video
                if (this.paused) {
                    let bar = this.$refs.holder.getBoundingClientRect()
                    if (this.mousePositionX) {
                        let temp = ((this.mousePositionX - bar.x) / (bar.width) * 100)
                        this.progressWidth = temp + "%"
                    }
                } else {
                    let bp = 0
                    let bw = 0
                    let pw = 0
                    bp = this.video.buffered.end(this.video.buffered.length-1) / this.video.duration
                    bw = bp * 100
                    pw = this.video.currentTime / this.video.duration * 100
                    this.bufferedWidth = bw +'%'
                    this.progressWidth = pw +'%'
                    // console.log(this.video.currentTime, this.video.duration)
                }
            },
            volumechange: function () {
                console.log('volumechange')
            },
            waiting: function () {
                console.log('waiting')
            },
            seekStart: function (e) {
                this.mousePositionX = e.clientX
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
                let bar = this.$refs.holder.getBoundingClientRect()
                let temp = ((this.mousePositionX - bar.x) / (bar.width) * 100)
                this.progressWidth = temp + "%"
                this.handleDisplay = true
                window.addEventListener('mousemove', this.seekMove)
                window.addEventListener('mouseup', this.seekEnd)
            },
            seekMove: function (e) {
                let bar = this.$refs.holder.getBoundingClientRect()
                this.mousePositionX = e.clientX
                let temp = ((this.mousePositionX - bar.x) / (bar.width) * 100)
                if (temp > 100) temp = 100
                if (temp < 0) temp = 0
                this.progressWidth = temp + "%"
            },
            seekEnd: function (e) {
                this.mousePositionX = e.clientX
                let bar = this.$refs.holder.getBoundingClientRect()
                let temp = ((this.mousePositionX - bar.x) / (bar.width) * 100)
                if (temp > 100) temp = 100
                if (temp < 0) temp = 0
                this.video.currentTime = ((temp * this.video.duration) / 100).toFixed(6)
                this.progressWidth = temp + "%"
                this.handleDisplay = false
                this.mousePositionX = 0

                if (this.keepPlay) {
                    this.playPause()
                }
                window.removeEventListener('mousemove', this.seekMove)
                window.removeEventListener('mouseup', this.seekEnd)
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
                let bar = this.$refs.holder.getBoundingClientRect()
                let temp = ((e.clientX - bar.x) / (bar.width) * 100)
                this.thumbnailBarWidth = temp + "%"
            }
        }
    }
    </script>
<style scoped>
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
        color:white;
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
    }
    .video-controls:hover .control-panel {
        display: block;
    }
    .paused .control-panel,.paused .video-title {
        display: block;
    }

    .progress-panel {
        position: relative;
        bottom:0;
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
</style>