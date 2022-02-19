interface Props {
    src: string;
    className?: string;
    draggable?: boolean;
    alt?: string;
    onClick?: () => void;
}

const Image = ({ src, className, draggable, alt, onClick }: Props) => (
    <img
        alt={alt ?? ""}
        draggable={draggable ? "true" : "false"}
        src={src}
        className={className}
        onClick={onClick} />
);

export default Image;