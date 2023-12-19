"use client";

import useGetSongsById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePLayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePLayer();
    const { song } = useGetSongsById(player.activeIds);
    
    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeIds){
        return null;
    }

    return (
        <div
        className="
            fixed
            bottom-0
            bg-black 
            w-full
            py-2
            h-[80px]
            px-4
        ">
            <PlayerContent
                key = {songUrl}
                song={song}
                songUrl = {songUrl}
            />
        </div>
    )
}

export default Player;