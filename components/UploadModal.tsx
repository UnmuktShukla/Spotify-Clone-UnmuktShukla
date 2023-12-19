"use client";

import uniqid from "uniqid";
import React ,{ useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal"
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const uploadModal = useUploadModal();
    const supaBaseClient = useSupabaseClient();
    const {user} = useUser();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title : '',
            song: null,
            image: null
        }
    });
    const onChange =(open: boolean)=>{
        if(!open){
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const ImageFile = values.image?.[0];
            const SongFile = values.song?.[0];

            if (!ImageFile || !SongFile || !user ){
                toast.error("missing fields");
                return; 
            }
            
            const UniqID = uniqid();

            //upload songs
            const {
                data : songData,
                error: songError,
            } = await supaBaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title} -${UniqID}`, SongFile , {
                    cacheControl:'3600' ,
                    upsert : false
                });
            
            if (songError){
                setIsLoading(false);
                return toast.error("error in uploading song");
            }

            //upload images
            const {
                data : imageData,
                error: imageError,
            } = await supaBaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${UniqID}`, ImageFile , {
                    cacheControl:'3600' ,
                    upsert : false
                });
            
            if (imageError){
                setIsLoading(false);
                return toast.error("error in uploading image")
            }

            const{
                error: supabaseError
            } = await supaBaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                })
            if(supabaseError){
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song Created");
            reset();
            uploadModal.onClose();

        } catch (error) {
            toast.error("something went wrong")
        } finally {
            setIsLoading(false);
        }
    } 
    return(
        <Modal
            title="Add a Song"
            description="Upload a .mp3 file"
            isOpen={uploadModal.isOpen} 
            onChange={onChange}
        >
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex flex-col gap-y-4
                "
            >
                <Input 
                    id= 'title'
                    disabled = {isLoading}
                    {...register('title',{required:  true})}
                    placeholder = 'song title'
                />

                <Input 
                    id= 'author'
                    disabled = {isLoading}
                    {...register('author',{required:  true})}
                    placeholder = 'song author'
                />

                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>

                    <Input 
                        id= 'song'
                        type="file"
                        disabled = {isLoading}
                        accept=".mp3"
                        {...register('song',{required:  true})}
                      
                    />
                </div>

                <div>
                    <div className="pb-1">
                        Select the thumbnail
                    </div>

                    <Input 
                        id= 'image'
                        type="file"
                        disabled = {isLoading}
                        accept="image/*"
                        {...register('image',{required:  true})}
                      
                    />
                </div>

                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}

export default UploadModal