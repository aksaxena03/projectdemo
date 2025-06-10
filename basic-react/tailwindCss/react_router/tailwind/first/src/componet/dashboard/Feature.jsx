export default function Feature() {
    function Box({ icon, names }) {
        return (
            <>
                <div className="cards rounded overflow-hidden   bg-fuchsia-50">
                    {icon}
                    <div className="icon1 size-10 rounded bg-sky-600  ml-1 ">
                    <div className="name font-bold">{names}</div>
                    </div><br />
                </div>
            </>
        )
    }
    return (
        <div className="card  max-w-sm rounded overflow-hidden shadow-lg m-2.5 p-1.5 bg-fuchsia-50">
            <Box icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>} names={"Add"} />

        </div>
    )
}