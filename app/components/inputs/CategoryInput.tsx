
import {IconType} from 'react-icons'

interface CategoryInputProps {
    icon: IconType;
    label:string;
    selected?:boolean;
    onClick:(value: string)=>void;
}

export default function CategoryInput({icon: Icon, label, selected, onClick}:CategoryInputProps){
    return (
        <div onClick={()=>onClick(label)} className={`flex items-center flex-col rounded-xl border-2 gap-3 p-4 cursor-pointer hover:border-black transition ${selected ? "border-black" : "border-neutral-200"}`}>
                <Icon size={30}/>
                <div className="font-semibold">{label}</div>
        </div>
    )
}