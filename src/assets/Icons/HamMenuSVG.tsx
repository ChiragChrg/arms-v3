type Props = {
    fill?: string,
    stroke?: string,
    size?: string,
    className?: string,
}

const HamMenuSVG = ({ fill = "currentColor", stroke = "currentColor", size = "100", className = "" }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
            stroke={stroke}
            width={size}
            height={size}
            className={className}
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M4 18h6M4 12h12M4 6h16"
            ></path>
        </svg>
    )
}

export default HamMenuSVG