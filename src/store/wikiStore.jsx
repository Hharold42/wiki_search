import axios from "axios";
import { makeAutoObservable } from "mobx";

class WikiStore {
  results = null;

  constructor() {
    makeAutoObservable(this);
  }

  setResults = (res) => {
    this.results = res;
  };

  changeSize = (newSize) => {
    this.size = newSize;
  };

  find = async (str, size, dom) => {
    try {
      await axios
        .get(
          `https://${dom}.wikipedia.org/w/api.php?action=opensearch&search=${str}&limit=${size}&namespace=0&format=json`
        )
        .then((resp) => this.setResults(resp.data));
    } catch (err) {
      console.error(err);
    }
  };
}

const exportedObj = new WikiStore();

export default exportedObj;
