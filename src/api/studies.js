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
