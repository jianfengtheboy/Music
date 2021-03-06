<template>
    <div class="search">
        <div class="search-box-wrapper">
            <!--searchBox query变化时派发query事件 search component监听该事件获取query值-->
            <!--search component将该值传递给suggest component-->
            <!--suggest component 监听到query值的变化调用search函数-->
            <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        </div>
        <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
            <Scroll class="shortcut"
                    :data="shortCut"
                    ref="shortcut"
                    :refreshDelay="refreshDelay"
            >
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="item"
                            v-for="item in hotkey"
                            :key="item.key"
                            @click="addQuery(item.k)"
                        >
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
                <div class="search-history" v-show="searchHistory.length">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span @click="showConfirm" class="clear">
                            <i class="icon-clear"></i>
                        </span>
                    </h1>
                    <SearchList @delete="deleteSearchHistory"
                                @select="addQuery"
                                :searches="searchHistory"
                    >
                    </SearchList>
                </div>
            </Scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <Suggest :query="query"
                     @listScroll="blurInput"
                     @select="saveSearch"
                     ref="suggest"
            >
            </Suggest>
        </div>
        <router-view></router-view>
        <Confirm ref="confirm"
                 @confirm="clearSearchHistory"
                 text="是否清空所有搜索历史"
                 confirmBtnText="清空">
        </Confirm>
    </div>
</template>

<script type="text/ecmacript-6">
import SearchBox from '../../base/SearchBox/SearchBox'
import SearchList from '../../base/SearchList/SearchList'
import Scroll from '../../base/Scroll/Scroll'
import Confirm from '../../base/Confirm/Confirm'
import Suggest from '../../components/Suggest/Suggest'
import { ERR_OK } from '../../api/config'
import { getHotKey } from '../../api/search'
import { mapActions } from 'vuex'
import { playListMixin, searchMixin } from '../../common/js/mixin'

export default {
    mixins: [playListMixin, searchMixin],
    components : {
        SearchBox,
        SearchList,
        Scroll,
        Confirm,
        Suggest
    },
    data () {
        return {
            hotkey : [],
            refreshDelay : 100
        }
    },
    computed : {
        shortCut () {
            return this.hotkey.concat(this.searchHistory)
        }
    },
    created () {
        this._getHotKey()
    },
    methods : {
        ...mapActions([
            'clearSearchHistory'
        ]),
        handlePlayList(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.searchResult.style.bottom = bottom
            this.$refs.suggest.refresh()
            this.$refs.shortcutWrapper.style.bottom = bottom
            this.$refs.shortcut.refresh()
        },
        showConfirm () {
            this.$refs.confirm.show()
        },
        _getHotKey () {
            getHotKey().then(res => {
                if (res.code === ERR_OK) {
                    this.hotkey = res.data.hotkey.slice(0, 10)
                }
            })
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.search
  .search-box-wrapper
    margin: 20px
  .shortcut-wrapper
    position: fixed
    top: 178px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 0 20px 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-l
        .item
          display: inline-block
          padding: 5px 10px
          margin: 0 20px 10px 0
          border-radius: 6px
          background: $color-highlight-background
          font-size: $font-size-medium
          color: $color-text-d
      .search-history
        position: relative
        margin: 0 20px
        .title
          display: flex
          align-items: center
          height: 40px
          font-size: $font-size-medium
          color: $color-text-l
          .text
            flex: 1
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
  .search-result
    position: fixed
    width: 100%
    top: 178px
    bottom: 0
</style>
