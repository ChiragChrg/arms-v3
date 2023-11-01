type Props = {
    fill?: string,
    stroke?: string,
    size?: string,
    className?: string,
}

const DocumentsSVG = ({ fill = "currentColor", stroke = "currentColor", size = "100", className = "" }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
            stroke={stroke}
            width={size}
            height={size}
            className={className}
            strokeWidth="0"
            viewBox="0 0 256 256"
        >
            <path d="M213.66 66.34l-40-40A8 8 0 00168 24H88a16 16 0 00-16 16v16H56a16 16 0 00-16 16v144a16 16 0 0016 16h112a16 16 0 0016-16v-16h16a16 16 0 0016-16V72a8 8 0 00-2.34-5.66zM168 216H56V72h76.69L168 107.31V216zm32-32h-16v-80a8 8 0 00-2.34-5.66l-40-40A8 8 0 00136 56H88V40h76.69L200 75.31zm-56-32a8 8 0 01-8 8H88a8 8 0 010-16h48a8 8 0 018 8zm0 32a8 8 0 01-8 8H88a8 8 0 010-16h48a8 8 0 018 8z"></path>
        </svg>
    )
}

export default DocumentsSVG