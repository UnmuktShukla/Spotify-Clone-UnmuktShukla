import { Songs } from "@/types";
import usePLayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Songs[]) => {
    const player = usePLayer();
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const {user , subscription } = useUser();
    
    const onPlay = (id:string) =>{
        if (!user) {
            return authModal.onOpen();
        }

        if(!subscription){
            return subscribeModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((songs) => songs.id))
    }

    return onPlay;
}

export default useOnPlay;