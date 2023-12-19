"use client" ;

import qs from "query-string";
import UseDebounce from "@/hooks/UseDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () =>{
    const router  = useRouter();
    const [value, setValue] = useState<string>("")
    const debouncedValue = UseDebounce<string>(value, 250)

    useEffect(() => {
        const query = {
            title: debouncedValue
        }

        const url = qs.stringifyUrl({
            url:'/search',
            query:query
        })

        router.push(url);
    }, [ debouncedValue , router ] )
    return (
        <div>
            <Input 
                placeholder="What do you want to listen to?"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )


}

export default SearchInput  