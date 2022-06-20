import { defineStore } from 'pinia'
import {Objetivo} from "../models/objetivo.model"

// export type MainState = {
//   objetivos: Objetivo[],
//   recursos: Recurso[],
//   planejamentos: Planejamento[]
// }

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
  state: () => {
    return {
      objetivos: [],
      recursos: [],
      planejamentos: []
    }
  },
  getters: {
    //@ts-ignore
    orderedPlanejamentos: (state) => state.planejamentos.sort((a, b) => a.data > b.data ? 1 : -1),
    //@ts-ignore
    lastPlanejameto: () => this.orderedPlanejamentos[0] ,
    //@ts-ignore
    isThisMonth: () => new Date(this.lastPlanejamento.data).getMonth() + new Date(this.lastPlanejamento.data).getFullYear() === new Date().getMonth() + new Date().getFullYear()
  },
  persist: {
    key: "main-store"
  },
})