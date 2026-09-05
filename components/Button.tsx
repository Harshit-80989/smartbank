"use client";

interface ButtonProps {
    text: string;
    onClick?: () => void; //Optional prop for handling click events on the button
}

export default function Button({text, onClick} : ButtonProps) {
    return (
        <button className="text-lg bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600" onClick={onClick}>
            {text}
        </button>
    );
}
