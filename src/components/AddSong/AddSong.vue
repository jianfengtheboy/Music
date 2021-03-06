<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close" @click="hide">
                    <i class="icon-close"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <SearchBox ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></SearchBox>
            </div>
            <div class="shortcut" v-show="!query">
                <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
                <div class="list-wrapper">
                    <Scroll v-if="currentIndex === 0" :data="playHistory" class="list-scroll" ref="songList">
                        <div class="list-inner">
                            <SongList :songs="playHistory" @select="selectSong"></SongList>
                        </div>
                    </Scroll>
                    <Scroll ref="searchList" v-if="currentIndex === 1" class="list-scroll" :data="searchHistory" :refreshDelay="refreshDelay">
                        <div class="list-inner">
                            <SearchList @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></SearchList>
                        </div>
                    </Scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <Suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></Suggest>
            </div>
            <TopTip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放列表</span>
                </div>
            </TopTip>
        </div>
    </transition>
</template>

<script>
import SearchBox from 'base/SearchBox/SearchBox'
import Suggest from 'components/Suggest/Suggest'
import { searchMixin } from 'common/js/mixin'
import Switches from 'base/Switches/Switches'
import Scroll from 'base/Scroll/Scroll'
import { mapGetters, mapActions } from 'vuex'
import SongList from 'base/SongList/SongList'
import Song from 'common/js/song'
import SearchList from 'base/SearchList/SearchList'
import TopTip from 'base/TopTip/TopTip'

export default {
    mixins: [searchMixin],
    components : {
        SearchBox,
        Suggest,
        Switches,
        Scroll,
        SongList,
        SearchList,
        TopTip
    },
    computed : {
        ...mapGetters([
            'playHistory'
        ])
    },
    data () {
        return {
            showFlag : false,
            showSinger : false,
            currentIndex : 0,
            switches: [
                { name : '最近播放' },
                { name : '搜索历史' }
            ]
        }
    },
    methods : {
        show () {
            this.showFlag = true
            setTimeout(() => {
                if (this.currentIndex === 0) {
                    this.$refs.songList.refresh()
                } else {
                    this.$refs.searchList.refresh()
                }
            }, 20)
        },
        hide () {
            this.showFlag = false
        },
        selectSuggest () {
            this.saveSearch()
            this.$refs.topTip.show()
        },
        switchItem (index) {
            this.currentIndex = index
        },
        selectSong (song, index) {
            if (index !== 0) {
                this.insertSong(new Song(song))
                this.$refs.topTip.show()
            }
        },
        ...mapActions([
            'insertSong'
        ])
    }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.add-song
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  z-index: 200
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .header
    position: relative
    height: 44px
    text-align: center
    .title
      line-height: 44px
      font-size: $font-size-large
      color: $color-text
    .close
      position: absolute
      top: 0
      right: 8px
      .icon-close
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
  .search-box-wrapper
    margin: 20px
  .shortcut
    .list-wrapper
      position: absolute
      top: 165px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
  .search-result
    position: fixed
    top: 124px
    bottom: 0
    width: 100%
  .tip-title
    text-align: center
    padding: 18px 0
    font-size: 0
    .icon-ok
      font-size: $font-size-medium
      color: $color-theme
      margin-right: 4px
    .text
      font-size: $font-size-medium
      color: $color-text
</style>
