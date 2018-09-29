<template>
    <transition name="slide">
        <MusicList :title="title" :bgImage="bgImage" :songs="songs" :rank="true"></MusicList>
    </transition>
</template>

<script type="text/ecmacript-6">
import MusicList from 'components/MusicList/MusicList'
import { getTopListDetail } from 'api/rank'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
    data () {
        return {
            songs : [],
            rank : true
        }
    },
    components : {
        MusicList
    },
    computed : {
        ...mapGetters([
            'topList'
        ]),
        title () {
            return this.topList.topTitle
        },
        bgImage () {
            if (this.songs.length) {
                return this.songs[0].image
            }
            return ''
        }
    },
    created () {
        this._getTopListDetail()
    },
    methods : {
        _getTopListDetail() {
            if (!this.topList.id) {
                this.$router.push('/rank')
                return
            }
            getTopListDetail(this.topList.id).then(res => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeList(res.songlist)
                }
            })
        },
        _normalizeList (list) {
            let ret = []
            list.forEach((item) => {
                const musicData = item.data
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
    transition: all 0.3s
.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
