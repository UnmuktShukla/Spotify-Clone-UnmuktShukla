import { Songs } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast";

const useGetSongsById = (id?: string) => {
    const [isLoading , setIsLoading] = useState(false);
    const [song , setSong ] = useState<Songs | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id){
            return;
        }

        setIsLoading(true);

        const fetchsong = async() =>{
            const { data,error } = await supabaseClient 
                .from('songs')
                .select('*')
                .eq('id' , id)
                .single();

            if(error){
                setIsLoading(false);
                return  toast.error(error.message);
            }

            setSong(data as Songs);
            setIsLoading(false)
        }

        fetchsong();
    },[id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
}

export default useGetSongsById;