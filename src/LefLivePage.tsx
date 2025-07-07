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
    </div>
  );
} 