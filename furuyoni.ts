import {
  FuruyoniTableCreateRes,
  FuruyoniTableDeleteReq,
  FuruyoniTableDeleteRes,
} from "./types/mod.ts";

export class FuruyoniClient {
  url = "https://furuyoni-simulator.herokuapp.com";

  async tableCreate(): Promise<FuruyoniTableCreateRes> {
    const res = await fetch(`${this.url}/tables.create`, {
      method: "POST",
    });
    return res.json();
  }

  async tableDelete(body: FuruyoniTableDeleteReq): Promise<void> {
    const res = await fetch(`${this.url}/tables.delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json: FuruyoniTableDeleteRes = await res.json();
    if (json.ok) {
      return;
    } else {
      throw new Error("Table delete failed");
    }
  }

  parseKeyFromUrl(url: string): string {
    const splitted = url.split("/");
    return splitted[splitted.length - 1];
  }
}
