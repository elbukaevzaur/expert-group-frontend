import * as React from "react"

function PlaySvgComponent(props) {
    return (
        <svg
            width={75}
            height={75}
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx={37.2944}
                cy={37.2944}
                r={37.2944}
                fill="#fff"
                fillOpacity={0.55}
            />
            <path
                d="M50.691 36.127c1.979 1.142 2.968 1.714 3.182 2.514.091.339.091.696 0 1.035-.214.8-1.203 1.371-3.182 2.514L36.018 50.66c-1.979 1.143-2.968 1.714-3.768 1.5a2 2 0 01-.896-.518c-.586-.586-.586-1.728-.586-4.013V30.687c0-2.285 0-3.427.585-4.013.249-.248.558-.427.897-.517.8-.215 1.79.356 3.768 1.498l14.673 8.472z"
                fill="#21A038"
            />
        </svg>
    )
}

export default PlaySvgComponent
