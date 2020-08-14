import { Name } from "./types";

const Util = {
  joinName(name: Name) {
    return name.first + " " + name.last;
  },
};

export default Util;
