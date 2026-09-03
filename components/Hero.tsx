interface HeroProps { //interface is used for defining the shape of props that the Hero component will accept
    title: string,
    subtitle: string,
    buttonText: string,
}
//mt stands for margin-top.
import Button from "./Button";
export default function Hero({title, subtitle, buttonText} : HeroProps) {
    return(
        <div className="flex flex-col items-center justify-center gap-6 mt-16">
            <h1 className="font-sans text-5xl font-bold">{title}</h1>
            <p className="font-serif text-4xl text-center max-w-md leading-tight">{subtitle}</p>
            <Button text={buttonText} />
        </div>
    );
}