import { useState, useMemo } from "react";
import MonacoEditor from "@monaco-editor/react";
import LEFVisualizer from "./LefVisualizer";
import { parseLef } from "./lefParser";
import type { LefData } from "./lefParser";

const DEFAULT_LEF = `#  180 nm Generic Library
# Contains LEF for all bins.
# Options:   [x] Antenna
#            [x] Geometry
#            [x] Technology

VERSION 5.4 ;
NAMESCASESENSITIVE ON ;
BUSBITCHARS "[]" ;
DIVIDERCHAR "/" ;
UNITS
  DATABASE MICRONS 2000 ;
END UNITS

USEMINSPACING OBS ON ;
USEMINSPACING PIN OFF ;
CLEARANCEMEASURE EUCLIDEAN ;


MANUFACTURINGGRID 0.005 ;

LAYER Poly
  TYPE	MASTERSLICE ;
END Poly

LAYER Metal1
  TYPE		ROUTING ;
  DIRECTION	HORIZONTAL ;
  PITCH		0.66  ;
  WIDTH		0.3 ;
  SPACING	0.3 ;
  SPACING	0.6 RANGE 10 100000  ;
  RESISTANCE	RPERSQ 0.101 ;
  CAPACITANCE	CPERSQDIST 0.00013153 ;
  EDGECAPACITANCE 8.770300e-05 ;
END Metal1

LAYER Via1
  TYPE	CUT ;
END Via1

LAYER Metal2
  TYPE		ROUTING ;
  DIRECTION	VERTICAL ;
  PITCH		0.66  ;
  WIDTH		0.3 ;
  SPACING	0.3 ;
  SPACING	0.6 RANGE 10 100000  ;
  RESISTANCE	RPERSQ 0.101 ;
  CAPACITANCE	CPERSQDIST 7.0018e-05 ;
  EDGECAPACITANCE 8.311500e-05 ;
END Metal2

LAYER Via2
  TYPE	CUT ;
END Via2

LAYER Metal3
  TYPE		ROUTING ;
  DIRECTION	HORIZONTAL ;
  PITCH		0.66  ;
  WIDTH		0.3 ;
  SPACING	0.3 ;
  SPACING	0.6 RANGE 10 100000  ;
  RESISTANCE	RPERSQ 0.101 ;
  CAPACITANCE	CPERSQDIST 6.3069e-05 ;
  EDGECAPACITANCE 1.002800e-04 ;
END Metal3

LAYER Via3
  TYPE	CUT ;
END Via3

LAYER Metal4
  TYPE		ROUTING ;
  DIRECTION	VERTICAL ;
  PITCH		0.66  ;
  WIDTH		0.3 ;
  SPACING	0.3 ;
  SPACING	0.6 RANGE 10 100000  ;
  RESISTANCE	RPERSQ 0.101 ;
  CAPACITANCE	CPERSQDIST 5.3607e-05 ;
  EDGECAPACITANCE 8.298600e-05 ;
END Metal4

LAYER Via4
  TYPE	CUT ;
END Via4

LAYER Metal5
  TYPE		ROUTING ;
  DIRECTION	HORIZONTAL ;
  PITCH		0.66  ;
  WIDTH		0.3 ;
  SPACING	0.3 ;
  SPACING	0.6 RANGE 10 100000  ;
  RESISTANCE	RPERSQ 0.045 ;
  CAPACITANCE	CPERSQDIST 3.144e-05 ;
  EDGECAPACITANCE 1.022400e-04 ;
END Metal5

LAYER Via5
  TYPE	CUT ;
END Via5

LAYER Metal6
  TYPE		ROUTING ;
  DIRECTION	VERTICAL ;
  PITCH		0.66  ;
  WIDTH		0.3 ;
  SPACING	0.3 ;
  SPACING	0.6 RANGE 10 100000  ;
  RESISTANCE	RPERSQ 0.045 ;
  CAPACITANCE	CPERSQDIST 3.144e-05 ;
  EDGECAPACITANCE 1.022400e-04 ;
END Metal6

LAYER OVERLAP
  TYPE	OVERLAP ;
END OVERLAP

SPACING
  SAMENET Metal1  Metal1	0.300 ;
  SAMENET Metal2  Metal2	0.300  STACK ;
  SAMENET Metal3  Metal3	0.300  STACK ;
  SAMENET Metal4  Metal4	0.300  STACK ;
  SAMENET Metal5  Metal5	0.300  STACK ;
  SAMENET Metal6  Metal6	0.300 ;
  SAMENET Via1  Via1	0.300 ;
  SAMENET Via2  Via2	0.300 ;
  SAMENET Via3  Via3	0.300 ;
  SAMENET Via4  Via4	0.300 ;
  SAMENET Via1  Via2	0.000  STACK ;
  SAMENET Via2  Via3	0.000  STACK ;
  SAMENET Via3  Via4	0.000  STACK ;
  SAMENET Via4  Via5	0.000  STACK ;
END SPACING

VIA M2_M1 DEFAULT
  LAYER Metal1 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  LAYER Via1 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal2 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END M2_M1

VIA M3_M2 DEFAULT
  LAYER Metal2 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  LAYER Via2 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal3 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END M3_M2

VIA M4_M3 DEFAULT
  LAYER Metal3 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  LAYER Via3 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal4 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END M4_M3

VIA M5_M4 DEFAULT
  LAYER Metal4 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  LAYER Via4 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal5 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END M5_M4

VIA M6_M5 DEFAULT
  LAYER Metal5 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  LAYER Via5 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal6 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END M6_M5

VIA Via23_stack_north DEFAULT
  TOPOFSTACKONLY
  LAYER Metal2 ;
    RECT -0.200 -0.200 0.200 0.300 ;
  LAYER Via2 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal3 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END Via23_stack_north

VIA Via23_stack_south DEFAULT
  TOPOFSTACKONLY
  LAYER Metal2 ;
    RECT -0.200 -0.300 0.200 0.200 ;
  LAYER Via2 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal3 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END Via23_stack_south

VIA Via34_stack_east DEFAULT
  TOPOFSTACKONLY
  LAYER Metal3 ;
    RECT -0.200 -0.200 0.300 0.200 ;
  LAYER Via3 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal4 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END Via34_stack_east

VIA Via34_stack_west DEFAULT
  TOPOFSTACKONLY
  LAYER Metal3 ;
    RECT -0.300 -0.200 0.200 0.200 ;
  LAYER Via3 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal4 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 6.400000e+00 ;
END Via34_stack_west

VIA Via45_stack_north DEFAULT
  TOPOFSTACKONLY
  LAYER Metal4 ;
    RECT -0.200 -0.200 0.200 0.300 ;
  LAYER Via4 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal5 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 2.540000e+00 ;
END Via45_stack_north

VIA Via45_stack_south DEFAULT
  TOPOFSTACKONLY
  LAYER Metal4 ;
    RECT -0.200 -0.300 0.200 0.200 ;
  LAYER Via4 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal5 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 2.540000e+00 ;
END Via45_stack_south

VIA Via56_stack_east DEFAULT
  TOPOFSTACKONLY
  LAYER Metal5 ;
    RECT -0.200 -0.200 0.300 0.200 ;
  LAYER Via5 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal6 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 2.540000e+00 ;
END Via56_stack_east

VIA Via56_stack_west DEFAULT
  TOPOFSTACKONLY
  LAYER Metal5 ;
    RECT -0.300 -0.200 0.200 0.200 ;
  LAYER Via5 ;
    RECT -0.100 -0.100 0.100 0.100 ;
  LAYER Metal6 ;
    RECT -0.200 -0.200 0.200 0.200 ;
  RESISTANCE 2.540000e+00 ;
END Via56_stack_west


END LIBRARY
`;

export default function LefLivePage() {
  const [lefText, setLefText] = useState(DEFAULT_LEF);
  const parsed = useMemo(() => {
    try {
      return parseLef(lefText);
    } catch {
      return { layers: [], vias: [] } as LefData;
    }
  }, [lefText]);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Left 30%: Monaco Editor */}
      <div style={{ width: "50%", minWidth: 0, borderRight: "1px solid #eee", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 8, background: "#f7f7f7", borderBottom: "1px solid #eee" }}>
          <b>LEF File Editor</b>
        </div>
        <MonacoEditor
          height="100%"
          defaultLanguage="plaintext"
          value={lefText}
          onChange={v => setLefText(v ?? "")}
          options={{ fontSize: 14, minimap: { enabled: false }, wordWrap: "on" }}
        />
      </div>
      {/* Right 70%: All via stacks grid */}
      <div className="lef-container" style={{ minWidth: 0, overflow: "auto" }}>
        <LEFVisualizer lefData={parsed.vias} />
      </div>
      {/* FAB for support/customer care */}
      <a
        href="https://github.com/pkalyankumar1010/lef-visualizer-web/issues"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 1000,
          background: "#007bff",
          color: "white",
          borderRadius: "50%",
          width: 35,
          height: 35,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          textDecoration: "none",
          fontSize: 28,
          transition: "background 0.2s",
          padding: 0,
        }}
        title="Get Support / Report Issue on GitHub"
      >
        {/* Provided customer support SVG icon */}
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="32" height="32" style={{display:'block'}} viewBox="0 0 6.827 6.827">
          <g>
            <path d="M3.027 4.218c-.854.374-1.11.574-1.212.664-.156.138-.242.653-.334 1.09h3.865c-.092-.437-.179-.952-.335-1.09-.1-.09-.348-.285-1.202-.659l-.782-.005z" fill="#000"/>
            <path d="M3.828 3.471v.947c-.116.146-.268.235-.415.242-.156.007-.308-.077-.414-.242v-.947c0-.51.83-.51.83 0z" fill="#fff"/>
            <path d="M3.828 3.471v.634c-.157.115-.308.179-.415.179-.106 0-.257-.064-.414-.179v-.634c0-.51.83-.51.83 0z" fill="#fff"/>
            <path d="m2.998 4.23-.335.145.427.592.323-.307z" fill="#fff"/>
            <path d="m3.828 4.231.335.144-.426.592-.324-.307z" fill="#fff"/>
            <path d="M5.11 5.032c.098.222.165.604.236.94H4.56c.018-.549.019-.84.548-.94z" fill="#fff"/>
            <path d="M3.413 1.253a1.199 1.199 0 0 1 1.203 1.202c0 .35-.154.829-.397 1.19-.21.311-.491.54-.806.54-.314 0-.595-.229-.805-.54-.243-.361-.397-.84-.397-1.19a1.199 1.199 0 0 1 1.202-1.202z" fill="#fff"/>
            <path d="M2.508 2.392c.218-.02.29-.012.546-.298.304.228.798.298 1.192.187.04-.011.13.158.164.466.27-.039.197-.454.184-.54a1.315 1.315 0 0 0-.33-.602 1.2 1.2 0 0 0-1.7 0c-.201.2-.331.47-.35.771l-.01.47c.066-.091.084-.4.239.045.055-.11-.01-.471.065-.5z" fill="#000"/>
            <path d="M2.216 2.516c.065 0 .218.166.218.367 0 .201-.054.365-.12.365-.065 0-.118-.164-.118-.365 0-.201-.046-.367.02-.367z" fill="#fff"/>
            <path d="M4.611 2.516c-.066 0-.218.166-.218.367 0 .201.053.365.119.365s.119-.164.119-.365c0-.201.046-.367-.02-.367z" fill="#fff"/>
            <path d="M3.188 3.692a.062.062 0 0 0 0-.123h-.71a.338.338 0 0 1-.34-.34.062.062 0 1 0-.123 0 .461.461 0 0 0 .463.463h.71z" fill="#000"/>
            <path d="M1.994 2.535a.062.062 0 0 0 .123 0v-.262c0-.357.146-.68.381-.916a1.292 1.292 0 0 1 1.83 0c.235.235.381.56.381.916v.262a.062.062 0 0 0 .124 0v-.262c0-.39-.16-.746-.417-1.003a1.415 1.415 0 0 0-2.005 0 1.415 1.415 0 0 0-.417 1.003v.262z" fill="#000"/>
            <path d="m2.22 3.333-.087-.04-.002-.823c0-.004.001-.009.003-.013l.08-.017a.03.03 0 0 1 .014.025l-.003.853c0 .006-.001.01-.004.015z" fill="#fff"/>
            <path d="m1.923 2.505.228-.053a.04.04 0 0 0-.003.016v.835l-.241-.11.025-.057-.026.057a.062.062 0 0 1-.035-.058v-.57c0-.03.022-.056.052-.06zm.276-.064.055-.013a.125.125 0 0 1 .028-.003c.036 0 .069.016.094.04a.172.172 0 0 1 .05.12v.61c0 .023-.006.049-.017.072a.176.176 0 0 1-.043.059.12.12 0 0 1-.079.03.108.108 0 0 1-.045-.01l-.036-.016a.04.04 0 0 0 .004-.016v-.846c0-.011-.004-.02-.01-.027z" fill="#000"/>
            <path d="m4.606 3.333.088-.04.002-.823a.027.027 0 0 0-.003-.013l-.08-.017a.03.03 0 0 0-.014.025l.002.853c0 .006.002.01.005.015z" fill="#fff"/>
            <path d="m4.904 2.505-.229-.053a.04.04 0 0 1 .003.016v.835l.242-.11-.026-.057.026.057a.062.062 0 0 0 .036-.058v-.57a.062.062 0 0 0-.052-.06zm-.277-.064-.054-.013a.125.125 0 0 0-.028-.003.133.133 0 0 0-.094.04.172.172 0 0 0-.05.12v.61a.176.176 0 0 0 .06.131.12.12 0 0 0 .078.03c.015 0 .03-.002.045-.01l.036-.016a.04.04 0 0 1-.003-.016v-.846c0-.011.004-.02.01-.027z" fill="#000"/>
            <path d="M3.342 3.447a.185.185 0 0 1 .131.316.185.185 0 0 1-.135.054v-.37h.004z" fill="#000"/>
            <path d="M3.342 3.447a.185.185 0 0 1 .131.316.185.185 0 0 1-.13.054c-.052 0-.252-.02-.286-.054a.185.185 0 0 1 0-.262c.034-.034.234-.054.285-.054z" fill="#000"/>
            <path d="m3.194 5.793.22-.953.219.953-.22.18z" fill="#fff"/>
            <path d="M1.717 5.032c-.098.222-.165.604-.236.94h.784c-.017-.549-.018-.84-.548-.94z" fill="#fff"/>
          </g>
        </svg>
      </a>
    </div>
  );
} 