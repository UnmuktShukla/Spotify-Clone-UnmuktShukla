import { stringify } from "querystring"
import { create } from "zustand"

interface PlayerStore {
    ids: string[]
    activeIds?: string
    setId: (id: string) => void
    setIds: (ids: string[]) =>void
    reset: () => void
}

const usePLayer = create<PlayerStore>((set) => ({
    ids:[],
    activeIds: undefined,
    setId: (id: string) => set({activeIds: id}),
    setIds: (ids:string[]) => set({ids: ids}),
    reset: () => set({ids: [] , activeIds : undefined})

}))

export default usePLayer;