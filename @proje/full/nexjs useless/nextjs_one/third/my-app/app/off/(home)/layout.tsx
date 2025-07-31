export default function layout({children}: Readonly<{
  children: React.ReactNode;
}>){
    return(
            <div>
                header
            {children}
            footer
            </div>
    );
}