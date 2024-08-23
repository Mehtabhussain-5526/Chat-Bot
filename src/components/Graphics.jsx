import React from "react";
export const Mic = ({props,color}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#a)">
      <path fill="" d="M0 0h24v24H0z" />
      <rect
        width={5}
        height={12}
        x={9.5}
        y={3.5}
        stroke={color}
        strokeLinejoin="round"
        rx={2.5}
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 12v1a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5v-1M12 18v3m0 0H9m3 0h3"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const Archive = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M3.955 2.25H20.045c.433 0 .83 0 1.152.043.356.048.731.16 1.04.47.31.309.422.684.47 1.04.043.323.043.72.043 1.152v.09c0 .433 0 .83-.043 1.152-.048.356-.16.731-.47 1.04-.293.294-.647.41-.987.462v5.357c0 1.838 0 3.294-.153 4.433-.158 1.172-.49 2.121-1.238 2.87-.749.748-1.698 1.08-2.87 1.238-1.14.153-2.595.153-4.433.153h-1.112c-1.838 0-3.294 0-4.433-.153-1.172-.158-2.121-.49-2.87-1.238-.748-.749-1.08-1.698-1.238-2.87-.153-1.14-.153-2.595-.153-4.433V7.7c-.34-.052-.694-.168-.987-.462-.31-.309-.422-.684-.47-1.04-.043-.323-.043-.72-.043-1.152v-.09c0-.433 0-.83.043-1.152.048-.356.16-.731.47-1.04.309-.31.684-.422 1.04-.47.323-.043.72-.043 1.152-.043Zm.295 5.5V13c0 1.907.002 3.262.14 4.29.135 1.005.389 1.585.812 2.008.423.423 1.003.677 2.009.812 1.028.138 2.382.14 4.289.14h1c1.907 0 3.261-.002 4.29-.14 1.005-.135 1.585-.389 2.008-.812.423-.423.677-1.003.812-2.009.138-1.027.14-2.382.14-4.289V7.75H4.25ZM2.823 3.823l.003-.001a.706.706 0 0 1 .177-.042c.21-.028.504-.03.997-.03h16c.493 0 .787.002.997.03a.704.704 0 0 1 .177.042l.003.001.001.003a.703.703 0 0 1 .042.177c.028.21.03.504.03.997s-.002.787-.03.997a.703.703 0 0 1-.042.177l-.001.003-.003.001a.704.704 0 0 1-.177.042c-.21.028-.504.03-.997.03H4c-.493 0-.787-.002-.997-.03a.706.706 0 0 1-.177-.042l-.003-.001-.001-.003a.706.706 0 0 1-.042-.177c-.028-.21-.03-.504-.03-.997s.002-.787.03-.997a.706.706 0 0 1 .042-.177l.001-.003Zm0 2.354Zm7.655 3.573h3.044c.214 0 .41 0 .576.011.178.012.373.04.572.122.428.178.77.519.947.947.082.199.11.394.122.572.011.165.011.362.011.576v.044c0 .214 0 .41-.011.576-.012.178-.04.373-.122.572a1.75 1.75 0 0 1-.947.947c-.199.082-.394.11-.572.122-.165.011-.362.011-.576.011h-3.044c-.214 0-.41 0-.576-.011a1.784 1.784 0 0 1-.572-.122 1.75 1.75 0 0 1-.947-.947 1.78 1.78 0 0 1-.122-.572 9.008 9.008 0 0 1-.011-.576v-.044c0-.214 0-.41.011-.576.012-.178.04-.373.122-.572a1.75 1.75 0 0 1 .947-.947c.199-.082.394-.11.572-.122.165-.011.362-.011.576-.011Zm-.577 1.52a.25.25 0 0 0-.13.131.642.642 0 0 0-.013.103A8.292 8.292 0 0 0 9.75 12c0 .243 0 .388.008.496.004.067.01.095.012.103a.25.25 0 0 0 .131.13.63.63 0 0 0 .103.013c.108.008.253.008.496.008h3c.243 0 .388 0 .496-.008a.632.632 0 0 0 .103-.012.25.25 0 0 0 .13-.131.632.632 0 0 0 .013-.103c.008-.108.008-.253.008-.496s0-.388-.008-.496a.632.632 0 0 0-.012-.103.25.25 0 0 0-.131-.13.632.632 0 0 0-.103-.013 8.258 8.258 0 0 0-.496-.008h-3c-.243 0-.388 0-.496.008a.63.63 0 0 0-.103.012Z"
      clipRule="evenodd"
    />
  </svg>
);

export const Share = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5M16 8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

export const Send = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.5 12H5.42m-.173.797L4.242 15.8c-.55 1.643-.826 2.465-.628 2.971.171.44.54.773.994.9.523.146 1.314-.21 2.894-.92l10.135-4.561c1.543-.695 2.314-1.042 2.553-1.524a1.5 1.5 0 0 0 0-1.33c-.239-.482-1.01-.83-2.553-1.524L7.485 5.243c-1.576-.71-2.364-1.064-2.887-.918a1.5 1.5 0 0 0-.994.897c-.198.505.074 1.325.618 2.966l1.026 3.091c.094.282.14.423.159.567a1.5 1.5 0 0 1 0 .385c-.02.144-.066.285-.16.566Z"
    />
  </svg>
);

export const Edit = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    stroke="#000"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18.378 8.45-9.414 9.415a2 2 0 0 1-1.022.547L5 19l.588-2.942a2 2 0 0 1 .547-1.022l9.415-9.415m2.828 2.829 1.415-1.414a1 1 0 0 0 0-1.415l-1.415-1.414a1 1 0 0 0-1.414 0L15.55 5.621m2.828 2.829L15.55 5.62"
    />
  </svg>
);

export const Delete = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#ef4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
    />
  </svg>
);

export const NewChat = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="m21.28 6.4-9.54 9.54c-.95.95-3.77 1.39-4.4.76-.63-.63-.2-3.45.75-4.4l9.55-9.55a2.58 2.58 0 1 1 3.64 3.65v0Z" />
      <path d="M11 4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11c2.21 0 3-1.8 3-4v-5" />
    </g>
  </svg>
);

export const SidebarToggle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 5v14M6 8h2m-2 3h2m-2 3h2m-1.8 5h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 17.48 21 16.92 21 15.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 19 5.08 19 6.2 19Z"
    />
  </svg>
)

export const Logo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    viewBox="0 0 200 200"
    {...props}
  >
    <circle
      cx={100}
      cy={100}
      r={95}
      fill="url(#a)"
      stroke="#222"
      strokeWidth={4}
    />
    <rect
      width={100}
      height={100}
      x={50}
      y={50}
      fill="url(#b)"
      stroke="#222"
      strokeWidth={3}
      rx={20}
      ry={20}
    />
    <circle cx={70} cy={85} r={10} fill="#fff" />
    <circle cx={130} cy={85} r={10} fill="#fff" />
    <circle cx={70} cy={85} r={5} fill="#00f" />
    <circle cx={130} cy={85} r={5} fill="#00f" />
    <rect width={50} height={10} x={75} y={120} fill="#222" rx={5} ry={5} />
    <path stroke="#222" strokeWidth={4} d="M100 50V20" />
    <circle cx={100} cy={20} r={6} fill="red" />
    <path fill="#0f0" d="M65 70h70v5H65z" />
    <path fill="#ff0" d="M65 100h70v5H65z" />
    <defs>
      <linearGradient id="a" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop
          offset="0%"
          style={{
            stopColor: "#00f",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "#0ff",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <linearGradient id="b" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop
          offset="0%"
          style={{
            stopColor: "#f0f",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "#ff0",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    </defs>
  </svg>
)