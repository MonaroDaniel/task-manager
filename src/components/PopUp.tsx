import If from "../tools/If"

interface PopUpProps {
    children: any;
    setOpen: (value: PopUpProps['open']) => void;
    open: boolean;
    title: string;
}

export default ({ children, setOpen, open = false, title }: PopUpProps) => {
    return (
        <>
            <If test={open}>
                <div className="w-full h-full absolute justify-center flex items-center z-50 top-0 backdrop-blur-sm bg-gray-500 bg-opacity-50">
                    <div className="w-full h-full absolute z-10" onClick={() => setOpen(false)}></div>
                    <div className="w-[70vw] h-max bg-wh-02 p-6 rounded-xl shadow-lg z-20">
                        <span className="uppercase font-medium text-xl text-gr-01">{title}</span>
                        {children}
                    </div>
                </div>
            </If>
        </>
    )
}