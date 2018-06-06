<template>
    <div id="app">
        <MHeader></MHeader>
        <Tab></Tab>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <Player></Player>
    </div>
</template>

<script type="text/ecmacript-6">
import MHeader from 'components/MHeader/MHeader'
import Tab from 'components/Tab/Tab'
import Player from 'components/Player/Player'

export default {
    components : {
        MHeader,
        Tab,
        Player
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/variable";
#app
  color:$color-theme
</style>
