<template>
    <div
        class="player-body"
        :class="{paused}"
    >
        <div class="video-container" :style="{width, height}">
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
            </video>
            <div class="video-controls">
                <div style="position: absolute; width:100%; top:0px; bottom:0px; box-sizing: border-box; " @click="playPause">

                </div>
                <div class="video-title" style="position: absolute; width:100%; height: 60px; box-sizing: border-box; background:rgba(0, 0, 255, 0.2);">

                </div>
                <div class="control-panel">
                    <div class="progress-panel">
                        <div class="progress-holder"></div>
                        <div class="buffered" :style="{width:bufferedWidth}"></div>
                        <div class="progress" :style="{width:progressWidth}"></div>
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
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100vh'
            }
        },
        data: function () {
            return {
                playPromise: null,
                paused: true,
                bufferedWidth: 0,
                progressWidth: 0,
            }
        },
        mounted: function () {
            let video = this.$refs.video
            if (Hls.isSupported()) {
                let hls = new Hls()
                hls.loadSource('https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8')
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED,function () {
                    video.play().catch(() => {
                        video.muted = true
                        video.play()
                    })
                })
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
                video.addEventListener('canplay', function () {
                    video.play().catch(() => {
                        video.muted=true
                        video.play()
                    })
                })
            }
        },
        methods: {
            playPause: function() {
                if (this.paused) {
                    this.playPromise = this.$refs.video.play()
                } else {
                    if (this.playPromise) {
                        this.playPromise.then(() => {
                            this.$refs.video.pause()
                        }).catch(() => {
                            this.$refs.video.pause()
                        })
                    } else {
                        this.$refs.video.pause()
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
                let video = this.$refs.video
                let bp = video.buffered.end(0) / video.duration
                let bw = bp * 100
                let pw = video.currentTime / video.duration * 100
                this.bufferedWidth = bw +'%'
                this.progressWidth = pw +'%'
                console.log(video.currentTime, video.duration)
                console.log('timeupdate')
            },
            volumechange: function () {
                console.log('volumechange')
            },
            waiting: function () {
                console.log('waiting')
            },
        }
    }
    </script>
<style scoped>
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
        height: 60px;
        padding: 0 20px;
        /* background: rgba(255, 0, 0, 0.2); */
        display: none;
    }
    .video-title {
        display: none;
    }
    .video-controls:hover .control-panel {
        display: block;
    }
    .paused .control-panel,.paused .video-title {
        display: block;
    }

    .progress-panel {
        /* background-color: rgba(255, 255, 255, 0.3); */
        height: 20px;
    }
    .progress-holder {
        position: relative;
        height: 5px;
        top: 15px;
        border-radius: 4px;
        background: rgba(180, 180, 180, 0.3);
        cursor: pointer;
    }
    .progress {
        position: relative;
        top: 5px;
        height: 5px;
        border-radius: 4px;
        background: rgba(10, 60, 210, 0.7);
        /* width: 20px; */
    }
    .buffered {
        position: relative;
        top: 10px;
        height: 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.2);
        /* width: 30px; */
    }
</style>