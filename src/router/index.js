import Vue from 'vue'
import Router from 'vue-router'

import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import topList from '@/components/top-list/topList'
import albumInfo from '@/components/album-info/albumInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend/',
      component: Recommend,
      children: [
        {
          path: 'albumInfo',
          component: albumInfo
        }
      ]
    },
    {
      path: '/topList',
      component: topList
    },
    {
      path: '/ablumInfo',
      component: albumInfo
    },
    {
      path: '/rank/',
      component: Rank,
      children: [
        {
          path: 'toplist',
          component: topList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/*',
      redirect: '/recommend'
    }
  ]
})
