<template>
    <div class="player-body">
        <div class="video-container" :style="{width, height}">
            <video ref="video" style="background: #333;">
                <source src="./file_example_MP4_480_1_5MG.mp4" type="video/mp4">
            </video>
            <div class="video-controls">
                <div style="position: absolute; width:100%; top:0px; bottom:0px; box-sizing: border-box; " @click="playPause">

                </div>
                <div style="position: absolute; width:100%; height: 100px; box-sizing: border-box; background:rgba(0, 0, 255, 0.2);">

                </div>
                <div style="position: absolute; bottom: 0; width:100%; height: 100px; box-sizing: border-box; background:rgba(255, 0, 0, 0.2);">
                    <button class="play" :class="{paused}" @click="playPause"></button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
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
                paused: false
            }
        },
        mounted: function () {

        },
        methods: {
            playPause: function() {

                this.paused = !this.paused
                if (this.paused) {
                    this.$refs.video.play()
                } else {
                    this.$refs.video.pause()
                }

            }
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
    }
    .video-container {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: black;
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
        border-style: solid;
        border-width: 10px 0 10px 18.3px;
    }
    .play.paused {
        border-style: double;
        border-width: 0px 0 0px 18.3px;
    }

</style>