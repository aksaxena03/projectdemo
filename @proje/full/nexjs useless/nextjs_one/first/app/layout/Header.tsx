interface HeaderProps {
    name: string;
    css:string;
}

export default function Header({ name,css }: HeaderProps) {
    return (
        <div className={`w-full absolute  ${css}`}>{name}</div>
    )
}