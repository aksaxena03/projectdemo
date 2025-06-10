import { useEffect, useRef } from "react"

export default function usePrev(value) {
    const ref = useRef()  //useRef is used to presists value between re-reander
                            //it us also update after fun exicute and ref.current is use to update value in useref of ref
    useEffect(() => {
        ref.current = value 
    }, [value])

    return ref.current
}