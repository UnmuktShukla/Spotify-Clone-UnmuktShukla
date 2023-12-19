"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePLayer from "@/hooks/usePlayer";
import { Songs } from "@/types";
import Image from "next/image";
import { title } from "process";

interface MediaItemProps {
    data: Songs,
    onClick?: (id : string) => void
}
const MediaItem : React.FC<MediaItemProps> = ({
    data,
    onClick 
}) => {
    const imageUrl = useLoadImage(data);
    const player = usePLayer();
    
    const handleClick =() => {
        if(onClick){
            return onClick(data.id);
        }

        return player.setId(data.id)
    }
    return(
        <div
            onClick={handleClick}
            className="
                flex 
                items-center
                gap-x-4
                cursor-pointer
                hover:bg-neutral-800/5
                w-full
                p-2
                rounded-md

            "
        >
            <div
                className="
                    relative 
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
                    overflow-hidden
                "
            >
                <Image 
                    fill
                    src={imageUrl || undefined }
                    alt= "Media Item"
                    className="object-cover"
                />
            </div>

            <div
                className="
                    flex
                    flex-col
                    gap-y-1
                    overflow-hidden
                "
            >
                <p className="text-white truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
            
        </div>
    )
}

export default MediaItem;
