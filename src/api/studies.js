import { keys } from "lodash";

export function getStudies() {
  const URL =
    "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs/studies?limit=25&offset=0&fuzzymatching=false&includefield=00081030%2C00080060&StudyDate=19511026-20200406";

  return window
    .fetch(URL, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((studies) => studies.map(transform));
}

function transform(study) {
  const output = {};
  for (const k of keys(Dictionary)) {
    const transformer = Dictionary[k];
    const item = study[k];
    if (item && item.Value && item.Value[0]) {
      output[transformer.toProp] = transformer.getValue(item);
    } else {
      console.log(k, study);
    }
  }
  return output;
}

const Dictionary = {
  "00081030": {
    getValue: (item) => item.Value[0],
    toProp: "Description",
  },
  "00080061": {
    // CS
    getValue: (item) => item.Value.join("/"),
    toProp: "Modality",
  },
  "00100010": {
    // PN
    getValue: (item) => item.Value[0].Alphabetic,
    toProp: "Name",
  },
  "0020000D": {
    // PN
    getValue: (item) => item.Value[0],
    toProp: "StudyInstanceUID",
  },
  "00100020": {
    // PN
    getValue: (item) => item.Value[0],
    toProp: "Pid",
  },
  "00080020": {
    // DA,
    getValue: (item) => {
      const date = item.Value[0];
      const YYYY = date.slice(0, 4);
      const MM = date.slice(4, 6);
      const DD = date.slice(6, 8);
      return new Date(`${YYYY}-${MM}-${DD}`);
    },
    toProp: "Date",
  },
};

/**
 *
 * ```ts
 * interface Length {
 *   toolType: 'Length';
 *   unit: string; // 'mm'
 *   length: number;
 *   PatientID: string;
 *   StudyInstanceUID: string;
 *   SeriesInstanceUID: string
 *   SOPInstanceUID: string;
 *   handles: {
 *     start: {
 *       x: number;
 *       y: number;
 *     }
 *     end: {
 *       x: number;
 *       y: number;
 *     }
 *   }
 *   viewport: {
 *     hflip: boolean;
 *     vflip: boolean;
 *     invert: boolean;
 *     roration: 0;
 *     scale: number;
 *     translation: {
 *       x: number;
 *       y: number;
 *     }
 *     voi: {
 *       windowWidth: 2330;
 *       windowCenter: 1057;
 *     }
 *   }
 * }
 *
 * ```
 * @type Length
 *
 * @prop unit
 * @prop length
 * @prop PatientID
 * @prop StudyInstanceUID
 * @prop SeriesInstanceUID
 * @prop SOPInstanceUID
 *
 */

// StudyInstanceUID 1.3.6.1.4.1.14519.5.2.1.7311.5101.158323547117540061132729905711
// SeriesInstanceUID 1.3.6.1.4.1.14519.5.2.1.7311.5101.250911858840767891342974687368
// SOPInstanceUID 1.3.6.1.4.1.14519.5.2.1.7311.5101.102288426246886258132616536944

/**
 * 
displaySetInstanceUID: "fd336603-76ec-5e14-8173-732296d81d0a"
SeriesDate: "20110707"
SeriesTime: "120403.625000"
SeriesInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.339319789559896104041345048780"
SeriesNumber: 7
SeriesDescription: "ep2d_diff_tra_DYNDIST_ADC"
numImageFrames: 19
frameRate: undefined
Modality: "MR"
isMultiFrame: false
InstanceNumber: 1
isReconstructable: true
StudyInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.158323547117540061132729905711"
sopClassUIDs: ["1.2.840.10008.5.1.4.1.1.4"]
plugin: "cornerstone"
 */

/**
  * 
  * 
StudyInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.158323547117540061132729905711"
SeriesInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.250911858840767891342974687368"
SOPInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.102288426246886258132616536944"

StudyInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.158323547117540061132729905711"
SeriesInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.339319789559896104041345048780"
SOPInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.106253188871235674594924044939"

StudyInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.158323547117540061132729905711"
SeriesInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.339319789559896104041345048780"
SOPInstanceUID: "1.3.6.1.4.1.14519.5.2.1.7311.5101.106253188871235674594924044939"
  */
