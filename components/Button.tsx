interface ButtonProps {
    text: string;  
}

export default function Button({text} : ButtonProps) {
    return (
        <button className="text-lg bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600">{text}</button>
    );
}
