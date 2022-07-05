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
      objetivosMes: [],
      recursos: [],
      recursosMes: [],
    }
  },
  actions: {
    getObjetivoById(objetivoId) {
      return this.objetivos.find(objetivo => objetivo.id === objetivoId);
    },
    getRecursoById(recursoId) {
      return this.recursos.find(recurso => recurso.id === recursoId);
    },
    saveObjetivo(objetivo) {
      this.objetivos.push(objetivo)
    },
    saveRecurso(recurso) {
      this.recursos.push(recurso)
    },
    updateObjetivo(objetivoAlterado) {
      this.objetivos.forEach(objetivo => {
        if(objetivoAlterado.id === objetivo.id) {
          objetivo.descricao = objetivoAlterado.descricao
        }
      })
    },
    updateRecurso(recursoAlterado) {
      this.recursos.forEach(recurso => {
        if(recursoAlterado.id === recurso.id) {
          recurso.descricao = recursoAlterado.descricao
        }
      })
    }
  },
  getters: {
    // //@ts-ignore
    // orderedPlanejamentos: (state) => state.planejamentos.sort((a, b) => a.data > b.data ? 1 : -1),
    // //@ts-ignore
    // lastPlanejameto() { return this.orderedPlanejamentos[0]} ,
    // rendaTotal() {return this.lastPlanejameto.planejamento.reduce((a, b) => Number(a.renda) + Number(b.renda) )},
    // //@ts-ignore
    // isThisMonth() { 
    //   const planejamentoDate = new Date(this.lastPlanejameto.data)
    //   const hoje = new Date()
    //   return planejamentoDate.getMonth() + planejamentoDate.getFullYear() === hoje.getMonth() + hoje.getFullYear()
    
    //}//return new Date(this.lastPlanejamento.data).getMonth() + new Date(this.lastPlanejamento.data).getFullYear() === new Date().getMonth() + new Date().getFullYear() }
  },
  persist: {
    key: "main-store"
  },
})