interface NavbarProps {
  buttonText: string;
}

export default function Navbar({buttonText} : NavbarProps) {
  return (
    <nav  className="flex justify-between px-6 py-4 bg-zinc-50 shadow-md ">
        <div className="font-bold text-xl">SmartBank</div>
        <button className="font-bold text-blue-500 hover:text-blue-700">{buttonText}</button>
    </nav>
  );
}