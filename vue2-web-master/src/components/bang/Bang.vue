<template>
    <div>
        <ul class="bang-ul">
            <app-bang v-for="list in bangList" :key="list.id" :list="list"></app-bang>
        </ul>
    </div>
</template>

<script>
    import Bang from './template/BangList.vue'
    import { bangList } from 'static/data/data'
    export default {
        name: 'Bang',
        components: {
            'app-bang': Bang
        },
        data() {
            return {
                bangList: bangList
            }
        }
    }
</script>