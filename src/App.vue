<template>
    <div id="app" @touchmove.prevent>
        <MHeader></MHeader>
        <Tab></Tab>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <!--播放器全局组件-->
        <Player></Player>
    </div>
</template>

<script type="text/ecmacript-6">
import MHeader from 'components/MHeader/MHeader'
import Tab from 'components/Tab/Tab'
import Player from 'components/Player/Player'

export default {
    name : 'app',
    components : {
        MHeader,
        Tab,
        Player
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
