/**
 * Created by yongyuehuang on 2017/4/19.
 */
<template>
  <div>
   <app-banner :listImg="listImg"></app-banner>
      <ul class="song-ul">
        <app-songList v-for="song in songList" :song="song" :key="song.id"></app-songList>
      </ul>
  </div>
</template>

<script>
    import Banner from './template/Banner.vue' //导入Banner组件
    import SongList from './template/SongList.vue' //导入歌曲列表组件
    import { a, b, c, d, e } from 'static/outImg' //导入图片
    import { songList } from 'static/data/data' //导入数据
     export default {
        data() {
            return {
                listImg: [
                    {url: a}, {url: b}, {url: c}, {url: d}, {url: e}
                ],
                songList: songList
            }
        },
        components: {
            'app-banner': Banner,
            'app-songList': SongList
        },
         created() {
             console.log(a, b, c, d, e)
         }
    };
</script>