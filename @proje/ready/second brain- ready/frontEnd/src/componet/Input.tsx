interface input{
    "use":string
    "reference":any

}

export function Input({use,reference}:input){
    return(
        <div>
          
            <input ref={reference} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={use} required />
        </div>
    )
}