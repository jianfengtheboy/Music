<template>
    <div id="app">
        <MHeader></MHeader>
        <Tab></Tab>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script type="text/ecmacript-6">
import MHeader from 'components/MHeader/MHeader'
import Tab from 'components/Tab/Tab'

export default {
    components : {
        MHeader,
        Tab
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
