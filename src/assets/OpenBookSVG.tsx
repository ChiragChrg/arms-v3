type Props = {
    fill?: string,
    stroke?: string,
    size?: string,
    className?: string,
}

const OpenBookSVG = ({ fill = "currentColor", stroke = "currentColor", size = "100", className = "" }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
            stroke={stroke}
            width={size}
            height={size}
            className={className}
            strokeWidth="0"
            viewBox="0 0 512 512"
        >
            <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zm0 0v288"
            ></path>
        </svg>
    )
}

export default OpenBookSVG