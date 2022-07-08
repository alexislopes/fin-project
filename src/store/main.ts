import { defineStore } from 'pinia'


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
    
    saveObjetivo(objetivo) {
      this.objetivos.push(objetivo);
    },
    saveRecurso(recurso) {
      this.recursos.push(recurso);
    },
    saveRecursoMes(recursoMes) {
      this.recursosMes.push(recursoMes);
    },
    saveObjetivoMes(objetivoMes) {
      this.objetivosMes.push(objetivoMes);
    },
    updateRecursoMes(recursoMesAlterado) {
      this.recursosMes.forEach(recursoMes => {
        if(recursoMesAlterado.id === recursoMes.id){
          recursoMes.recursoId = recursoMesAlterado.recursoId;
          recursoMes.montante = recursoMesAlterado.montante;
          recursoMes.date = recursoMesAlterado.date;
        }
      }) 
    },
    updateObjetivo(objetivoAlterado) {
      this.objetivos.forEach(objetivo => {
        if(objetivoAlterado.id === objetivo.id) {
          objetivo.descricao = objetivoAlterado.descricao
        }
      })
    },

    getThisMonthRecursoMes(){
      return this.recursosMes.filter(recursosMes =>  new Date().getMonth() + new Date().getMonth() === new Date(recursosMes.date).getMonth() + new Date(recursosMes.date).getMonth() )
    },
    getThisMonthObjetivoMes() {
      return this.objetivosMes.filter(objetivoMes =>  new Date().getMonth() + new Date().getMonth() === new Date(objetivoMes.date).getMonth() + new Date(objetivoMes.date).getMonth() ).map(objetivoMes => Object.assign(objetivoMes, {
        recurso: this.recursos.find(recurso => recurso.id === objetivoMes.recursoId),
        objetivo: this.objetivos.find(objetivo => objetivo.id === objetivoMes.objetivoId),
        recursoMes: this.recursosMes.filter(recursosMes =>  new Date().getMonth() + new Date().getMonth() === new Date(recursosMes.date).getMonth() + new Date(recursosMes.date).getMonth() ).find(recursoMes => recursoMes.recursoId === objetivoMes.recursoId)
      })) 
    },
    getObjetivoById(objetivoId) {
      console.log("🚀 ~ file: main.ts ~ line 23 ~ getObjetivoById ~ objetivoId", objetivoId)
      return this.objetivos.find(objetivo => objetivo.id === objetivoId);
    },
    getRecursoById(recursoId) {
      return this.recursos.find(recurso => recurso.id === recursoId);
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
    
  },
  persist: {
    key: "main-store"
  },
})